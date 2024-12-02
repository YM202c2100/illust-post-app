import { GET } from "@/app/api/getRequest";
import { RankPointsGraph } from "@/app/features/history/components/RankPointsGraph/rankPointsGraph";
import { HistoryDataGET } from "@/app/models/pages/history.model";
import { redirect } from "next/navigation";

export default async function History(){
  const res = await GET("history")
  if(!res.ok){
    console.error(res.status)
  }
  const data:HistoryDataGET = await res.json()

  if(!data.isLogin){
    redirect("login")
  }

  const RPHistory = data.history.map((pastData) => pastData.rankPoints)

  return(
    <RankPointsGraph rankPointsHistory={RPHistory}/>
  )
}