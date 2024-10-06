import { GET } from "@/app/api/getRequest";
import { ImagesToJudge, ImagesToJudgeProps } from "@/app/features/judge/components/imagesToJudge"
import { JudgeDataGET } from "@/app/models/judge.model";
import { redirect } from "next/navigation";

export default async function Judge(){
  const res = await GET("judge")
  if(!res.ok){
    return <div>通信失敗</div>;
  }

  const data:JudgeDataGET =  await res.json()
  
  if(!data.isLogin){
    redirect("login")
  }

  if(!data.isSubmitted){
    return <div>作品を提出してください</div>
  }

  return(
    <ImagesToJudge props={{allImages: data.imagesToJudge, limitCanJudge: data.limitCanJudge}} />
  )
}