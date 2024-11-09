"use client"

import { ImageToJudge } from "@/app/models/pages/judge.model"
import { useReducer, useRef, useState } from "react"
import { ImageUnderJudging, ImageUnderJudgingProps } from "./imageUnderJudging"
import { useEnterAnimation } from "../../hooks/enterAnimation"

export type ImagesToJudgeProps = {
  allImages: ImageToJudge[],
  limitCanJudge: number
}
export type SelectedSide = "left"|"right"|null

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
  
  const leftImageProps = generateProps("left")
  const rightImageProps = generateProps("right")

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

      <div className="snap-center w-0 md:hidden"></div>

      <ImageUnderJudging {...rightImageProps}/>

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

  function generateProps(side:NonNullable<SelectedSide>):ImageUnderJudgingProps{
    return {
      images:images,
      thisSide:side,
      selectedSide:selectedSide,
      dispatchSelectedSide: dispatchSelectedSide
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

export type SelectSideAction = {type:NonNullable<SelectedSide>}
function selectedSideReducer(prevState:SelectedSide, action:SelectSideAction):SelectedSide{
  switch (action.type) {
    case "left":
      if(prevState === "left"){
        return null
      }else{
        return "left"
      }

    case "right":
      if(prevState === "right"){
        return null
      }else{
        return "right"
      }
  }
}

function getRemainingJudgeableImages(allImages:ImageToJudge[], limitCanJudge:number){
  return allImages.slice(2*limitCanJudge-2, 2*limitCanJudge)
}