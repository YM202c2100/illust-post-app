import { judgeApiGetRequest } from "@/app/features/judge/api/route"
import { ImagesToJudge, ImageToJudgeProps } from "@/app/features/judge/components/imagesToJudge"

export default async function Judge(){
  const res = await judgeApiGetRequest()
  if(!res.ok){
    return <div>通信失敗</div>;
  }

  const data = await res.json()
  const images:ImageToJudgeProps[] = data.body
  
  if(data.status === "ok"){
    return(
      <ImagesToJudge images={images} />
    )
  }else{
    return(
      <div>{data.body}</div>
    )
  }
}