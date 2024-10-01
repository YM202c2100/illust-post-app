import { PHP_ROOT_PATH } from "@/app/api/config"
import { getHeaderWithSessId } from "@/app/api/cookieHeader";

export default async function Ranking(){
  const reqHeader = getHeaderWithSessId()
  const res = await fetch(PHP_ROOT_PATH+"ranking.php",{
    method:"get",
    credentials:"include",
    headers:reqHeader
  });

  if(!res.ok){
    console.error(res.status);
  }

  const data = await res.json()

  if(data.status === "error"){
    return(
      <div>{data.body}</div>
    )
  }else{
    console.log(data);
    
    return(
      //上位何%か ランク 
      //自分より少し上の作品 自分の作品
      //上位3作品
      <div>
        <div>ranking</div>
        <div>順位:{data.body.rankPosition}</div>
        <div>上位:{Math.round(data.body.percentail)}%</div>
      </div>
    )
  }

}