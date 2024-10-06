"use client"

import { ImageToJudge } from "@/app/models/judge.model"
import { useState } from "react"

export type ImagesToJudgeProps = {
  allImages: ImageToJudge[],
  limitCanJudge: number
}

// 引数のimages配列の要素数は2
export const ImagesToJudge:React.FC<{props: ImagesToJudgeProps}> = ({props})=>{
  const [limitCanJudge, setLimitCanJudge] = useState(props.limitCanJudge)
  const images = getRemainingJudgeableImages(props.allImages, limitCanJudge)

  if(limitCanJudge === 0){
    return <div>全ての審査を終えました! 結果発表をお待ちください!</div>
  }

  return(
    <div className="flex justify-around">
      {images.map((image,idx) => (
        <div key={image.user_id}>
          <img src={`/postedImages/${image.file_name}`} alt={image.file_name} width={700}/>
          <button onClick={()=>{chooseImage(idx)}}>選択</button>
        </div>
      ))}
    </div>
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
      console.error("not ok")
    }

    const data = await res.json()
    console.log(data);
    setLimitCanJudge(prev => prev - 1)
  }

}

function getRemainingJudgeableImages(allImages:ImageToJudge[], limitCanJudge:number){
  return allImages.slice(2*limitCanJudge-2, 2*limitCanJudge)
}