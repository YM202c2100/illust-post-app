"use client"

import { ImageToJudge } from "@/app/models/pages/judge.model"
import { useReducer, useRef, useState } from "react"
import { ImageUnderJudging, ImageUnderJudgingProps } from "./imageUnderJudging"
import { useEnterAnimation } from "../../hooks/enterAnimation"

export type ImagesToJudgeProps = {
  allImages: ImageToJudge[],
  limitCanJudge: number
}
const SelectedSide = {
  left:0,
  right:1,
  null:null
} as const

export type SelectedSideType = typeof SelectedSide[keyof typeof SelectedSide]

// 引数のimages配列の要素数は2
export const ImagesToJudge:React.FC<{props: ImagesToJudgeProps}> = ({props})=>{
  const [limitCanJudge, setLimitCanJudge] = useState(props.limitCanJudge)
  const [selectedSide, dispatchSelectedSide] = useReducer(selectedSideReducer, null)
  const images = getRemainingJudgeableImages(props.allImages, limitCanJudge)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  if(limitCanJudge === 0){
    return <div>全ての審査を終えました! 結果発表をお待ちください!</div>
  }

  useEnterAnimation(scrollContainerRef)
  
  const leftImageProps = generateProps(SelectedSide.left)
  const rightImageProps = generateProps(SelectedSide.right)

  return(
    <>
    <div 
      ref={scrollContainerRef}
      className="w-[90%] md:w-[85%] mx-auto
      overflow-auto snap-x snap-mandatory
      flex md:justify-center md:gap-4
      md:py-10 md:px-4 mb-4
      shadow-md md:shadow-none shadow-slate-400"
    >
      <ImageUnderJudging {...leftImageProps}/>
      <ImageUnderJudging {...rightImageProps}/>
    </div>

    <div className="text-center my-2">
      <button
      disabled={selectedSide===null}
      className="bg-green-500 text-gray-100 p-3 rounded-2xl"
      onClick={()=>{console.log(selectedSide)}}
      >
        こっちが良い！
      </button>
    </div>

    <div className="flex justify-around">
      {images.map((image,idx) => (
        <div key={image.user_id}>
          <img src={`/postedImages/${image.file_name}`} alt={image.file_name} width={700}/>
          <button onClick={()=>{chooseImage(idx)}}>選択</button>
        </div>
      ))}
    </div>
    </>
  )

  function generateProps(side:NonNullable<SelectedSideType>):ImageUnderJudgingProps{
    return {
      images:images,
      thisSide:side,
      selectedSide:selectedSide,
      dispatchSelectedSide: dispatchSelectedSide,
      containerRef:scrollContainerRef
    }
  }

  async function chooseImage(winnerIndex:number){
    const loserIndex = (winnerIndex===0) ? 1:0

    const judgeResult = {
      winnerId:images[winnerIndex].user_id,
      loserId:images[loserIndex].user_id
    }

    const body = JSON.stringify(judgeResult)

    const res = await fetch("features/judge/api",{
      method:"post",
      body:body,
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      }
    })

    if(!res.ok){
      const data = await res.json()
      console.error(data.errMsg)
    }

    setLimitCanJudge(prev => prev - 1)
  }

}

export type SelectSideAction = {type:NonNullable<SelectedSideType>}
function selectedSideReducer(prevState:SelectedSideType, action:SelectSideAction):SelectedSideType{
  switch (action.type) {
    case SelectedSide.left:
      if(prevState === SelectedSide.left){
        return SelectedSide.null
      }else{
        return SelectedSide.left
      }

    case SelectedSide.right:
      if(prevState === SelectedSide.right){
        return null
      }else{
        return SelectedSide.right
      }
  }
}

function getRemainingJudgeableImages(allImages:ImageToJudge[], limitCanJudge:number){
  return allImages.slice(2*limitCanJudge-2, 2*limitCanJudge)
}