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
    <div>
      <div>前回のコンテスト結果</div>

      <div>
        <p>上位3作品</p>
        <div className="grid grid-cols-3">
          {top3.map(image => <OthersImage image={image}/>)}
        </div>
      </div>

      <div>投稿した作品</div>
      <div className="flex justify-center">
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

      <div>自分より上位の作品</div>
      <div className="grid grid-cols-3">
        {higher.map(image => <OthersImage image={image}/>)}
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