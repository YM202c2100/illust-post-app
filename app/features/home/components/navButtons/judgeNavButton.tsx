"use client"

import { useRouter } from "next/navigation"

export const JudgeNavButton:React.FC<{limitCanJudge:number|null}> = ({limitCanJudge})=>{
  const router = useRouter();

  return(
    <div 
      className="cursor-pointer bg-slate-300 hover:bg-green-200 w-full h-full rounded-2xl"
      onClick={()=>router.push("judge")}
    >
      <div>ジャッジ</div>
      <div>残り回数：{limitCanJudge ?? 0}/3</div>
      <div>{(limitCanJudge===null) && "ジャッジを行うには、コンテストに作品を投稿する必要があります"}</div>
    </div>
  )
}