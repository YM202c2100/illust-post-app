import { PHP_ROOT_PATH } from "@/app/api/config"
import { getHeaderWithSessId } from "@/app/api/cookieHeader";
import { HigherRankImages } from "@/app/features/result/components/higherRankImages";
import { SubmissionResult } from "@/app/features/result/components/SubmissionResult/submissionResult";
import { Top3Images } from "@/app/features/result/components/top3Images";
import { ResultDataGET } from "@/app/models/pages/result.model";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Result(){
  const reqHeader = getHeaderWithSessId()
  const res = await fetch(PHP_ROOT_PATH+"result.php",{
    method:"get",
    credentials:"include",
    headers:reqHeader
  });

  if(!res.ok){
    console.error(res.status);
  }

  const data:ResultDataGET = await res.json()
  if(data.debug){
    return <div>{data.debug}</div>
  }
  
  if(!data.isLogin){
    redirect("login")
  }

  if(!data.isSubmitted){
    return <div>自分が参加したコンテストしか結果を見ることはできません</div>
  }

  return(
    <div className="container mx-auto space-y-16">
      <div className="text-center">
        <div className="text-3xl">第{data.prevContestInfo.round_num}回コンテスト</div>
        <div className="text-4xl">「{data.prevContestInfo.subject}」</div>
        <div className="text-4xl mt-4">最終結果</div>
        <div className="text-end">
          <Link href={"history"}>過去の作品を見る ＞</Link>
        </div>
      </div>

      <SubmissionResult {...data}/>
      
      <Top3Images images={data.top3Images}/>
        
      <HigherRankImages images={data.higherRankImages}/>
    </div>
  )
}