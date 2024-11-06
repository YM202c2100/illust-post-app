"use client"

import { ImageToJudge } from "@/app/models/pages/judge.model"
import { useState } from "react"

export type ImagesToJudgeProps = {
  allImages: ImageToJudge[],
  limitCanJudge: number
}

// 引数のimages配列の要素数は2
export const ImagesToJudge:React.FC<{props: ImagesToJudgeProps}> = ({props})=>{
  const [limitCanJudge, setLimitCanJudge] = useState(props.limitCanJudge)
  const [selectedSide, setSelectedSide] = useState<"left"|"right"|null>(null)
  const images = getRemainingJudgeableImages(props.allImages, limitCanJudge)

  if(limitCanJudge === 0){
    return <div>全ての審査を終えました! 結果発表をお待ちください!</div>
  }

  return(
    <>
    <div 
      className="w-[90%] md:w-[85%] mx-auto
      overflow-auto snap-x snap-mandatory
      flex md:justify-center md:gap-4
      my-10"
    >
      <div 
        className={`snap-center 
          flex-shrink-0 ${(selectedSide==="left")?"md:flex-grow-1.2":"md:flex-grow"}
          w-full md:w-auto 
          md:flex flex-col justify-end bg-red-500`}
        onClick={()=>{setSelectedSide("left")}}
      >
        <div className="w-full aspect-square bg-red-300"></div>
      </div>

      <div className="snap-center w-0 md:hidden"></div>

      <div 
        className={`snap-center 
          flex-shrink-0 ${(selectedSide==="right")?"md:flex-grow-1.2":"md:flex-grow"}
          w-full md:w-auto 
          md:flex flex-col justify-end bg-green-500`}
        onClick={()=>{setSelectedSide("right")}}
      >
        <div className="w-full aspect-square bg-green-300"></div>
      </div>

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

function getRemainingJudgeableImages(allImages:ImageToJudge[], limitCanJudge:number){
  return allImages.slice(2*limitCanJudge-2, 2*limitCanJudge)
}