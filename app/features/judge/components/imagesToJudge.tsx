"use client"

import { ImageToJudge } from "@/app/models/pages/judge.model"
import { useReducer, useRef, useState } from "react"
import { ImageUnderJudging, ImageUnderJudgingProps } from "./imageUnderJudging"
import { useEnterAnimation } from "../hooks/enterAnimation"
import { ConfirmButton } from "./confirmButton"

export type ImagesToJudgeProps = {
  allImages: ImageToJudge[],
  limitCanJudge: number
}
export const SelectedSide = {
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

    <ConfirmButton selectedSide={selectedSide} images={images} setLimitCanJudge={setLimitCanJudge} dispatchSelectedSide={dispatchSelectedSide}/>
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
}

export type SelectSideAction = "left-selected"|"right-selected"|"reset"
function selectedSideReducer(prevState:SelectedSideType, action:{type:SelectSideAction}):SelectedSideType{
  switch (action.type) {
    case "left-selected":
      if(prevState === SelectedSide.left){
        return SelectedSide.null
      }else{
        return SelectedSide.left
      }

    case "right-selected":
      if(prevState === SelectedSide.right){
        return null
      }else{
        return SelectedSide.right
      }
    
    case "reset":
      return null
  }
}

function getRemainingJudgeableImages(allImages:ImageToJudge[], limitCanJudge:number){
  return allImages.slice(2*limitCanJudge-2, 2*limitCanJudge)
}