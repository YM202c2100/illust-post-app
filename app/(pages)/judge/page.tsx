import { GET } from "@/app/api/getRequest";
import { ImagesToJudge, ImagesToJudgeProps } from "@/app/features/judge/components/imagesToJudge"
import { JudgeDataGET } from "@/app/models/pages/judge.model";
import { redirect } from "next/navigation";

export default async function Judge(){
  const res = await GET("judge")
  if(!res.ok){
    return <div>通信失敗</div>;
  }

  const data:JudgeDataGET =  await res.json()
  
  if(!data.isWithinPeriod){
    return <div>現在ジャッジ期間中ではございません。コンテスト情報をお確かめください</div>
  }

  if(!data.isLogin){
    redirect("login")
  }

  if(!data.isSubmitted){
    return <div>作品を提出してください</div>
  }

  if(!Array.isArray(data.imagesToJudge) || data.imagesToJudge.length != 6){
    return <div>このコンテストでは十分な作品が投稿されていないため利用できません</div>
  }

  return(
    <div>
      <p className="text-4xl text-center mb-4">自分が好きな作品を選択しよう</p>
      <ImagesToJudge props={{allImages: data.imagesToJudge, limitCanJudge: data.limitCanJudge}} />
    </div>
  )
}