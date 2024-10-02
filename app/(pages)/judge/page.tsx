import { GET } from "@/app/api/getRequest";
import { ImagesToJudge, ImageToJudgeProps } from "@/app/features/judge/components/imagesToJudge"

export default async function Judge(){
  const res = await GET("judge")
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