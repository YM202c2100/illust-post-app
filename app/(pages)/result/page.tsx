import { PHP_ROOT_PATH } from "@/app/api/config"
import { getHeaderWithSessId } from "@/app/api/cookieHeader";
import { HigherRankImages } from "@/app/features/result/components/higherRankImages";
import { MySubmitResult } from "@/app/features/result/components/mySubmitResult";
import { Top3Images } from "@/app/features/result/components/top3Images";
import { ResultDataGET } from "@/app/models/result.model";
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
    <div>
      <div className="text-4xl">前回のコンテスト結果</div>
      <Top3Images images={data.top3Images}/>

      <div className="text-3xl">投稿した作品</div>
      <MySubmitResult {...data}/>

      <div className="text-3xl">自分より上位の作品</div>
      <HigherRankImages images={data.higherRankImages}/>
    </div>
  )
}