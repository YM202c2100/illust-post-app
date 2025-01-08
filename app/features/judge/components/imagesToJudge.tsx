"use client"

import { useReducer, useRef, useState } from "react"
import { ImageUnderJudging, ImageUnderJudgingProps } from "./imageUnderJudging"
import { useEnterAnimation } from "../hooks/enterAnimation"
import { ConfirmButton, ConfirmButtonProps } from "./confirmButton"

export type ImagesToJudgeProps = {
  allImages: string[],
  initialLimitCanJudge: number
}

export const SelectedSide = {
  left:0,
  right:1,
  null:null
} as const

export type SelectedSideType = typeof SelectedSide[keyof typeof SelectedSide]

// 引数のimages配列の要素数は2
export const ImagesToJudge:React.FC<ImagesToJudgeProps> = ({allImages, initialLimitCanJudge})=>{
  const [limitCanJudge, setLimitCanJudge] = useState(initialLimitCanJudge)
  const [selectedSide, dispatchSelectedSide] = useReducer(selectedSideReducer, null)
  const images = getNextJudgeableImages(allImages, limitCanJudge)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEnterAnimation(scrollContainerRef)

  if(limitCanJudge === 0){
    return <div>全ての審査を終えました! 結果発表をお待ちください!</div>
  }
  
  const leftImageProps = generateProps(SelectedSide.left)
  const rightImageProps = generateProps(SelectedSide.right)
  const confirmButtonProps:ConfirmButtonProps = {
    selectedSide:selectedSide,
    limitCanJudge:limitCanJudge,
    setLimitCanJudge:setLimitCanJudge,
    dispatchSelectedSide:dispatchSelectedSide
  }

  return(
    <>
    <ConfirmButton {...confirmButtonProps}/>
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

// 表示する二つの画像を取得
function getNextJudgeableImages(allImages:string[], limitCanJudge:number){
  const offset = calcOffset(limitCanJudge)
  return allImages.slice(offset, offset+2)
}

export function calcOffset(limitCanJudge:number){
  return (3-limitCanJudge)*2
}