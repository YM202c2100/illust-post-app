import { PHP_ROOT_PATH } from "@/app/api/config"
import { getHeaderWithSessId } from "@/app/api/cookieHeader"
import { ImagesToJudge, ImageToJudgeProps } from "@/app/features/judge/components/imagesToJudge"

export default async function Judge(){
  const reqHeaders = getHeaderWithSessId()

  const res = await fetch(PHP_ROOT_PATH+"judge.php",{
    method: "get",
    credentials: "include",
    headers: reqHeaders
  })

  if(!res.ok){
    return(
      <div>通信失敗</div>
    )
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