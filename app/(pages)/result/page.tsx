import { PHP_ROOT_PATH } from "@/app/api/config"
import { getHeaderWithSessId } from "@/app/api/cookieHeader";
import { convertToValidSrc } from "@/app/libs/helper";
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

  const top3 = data.top3Images
  const higher = data.higherRankImages
  const percentail = Math.round(data.rankPosition/data.totalNumCompetitors*100)
  const myImgSrc = convertToValidSrc(data.myImage.file_name)
  
  return(
    //上位何%か ランク 
    //自分より少し上の作品 自分の作品
    //上位3作品
    <div>
      <div>result</div>
      <div className="grid grid-cols-3">
        <OthersImage image={top3[0]}/>
        <OthersImage image={top3[1]}/>
        <OthersImage image={top3[2]}/>
      </div>
      <div className="grid grid-cols-2">
        <img src={myImgSrc}/>
        <div>
          <div>RP:{data.beforeRP ?? "---"}</div>
          <div>↓</div>
          <div>RP:{data.myImage.rank_points}</div>
          <div>
            順位:{data.rankPosition}/{data.totalNumCompetitors}
          </div>
          <div>上位:{percentail}%</div>
        </div>
      </div>
      <div>
        <OthersImage image={higher[0]}/>
        <OthersImage image={higher[1]}/>
        <OthersImage image={higher[2]}/>
      </div>
    </div>
  )
}

const OthersImage:React.FC<{
  image:{user_name:string, file_name:string, rank_points?:number}
}> = ({image})=>{
  return(
    <div>
      <img src={`/postedImages/${image.file_name}`} width={300}/>
      <p>{image.user_name}</p>
      <p>{image.rank_points ?? null}</p>
    </div>
  )
}