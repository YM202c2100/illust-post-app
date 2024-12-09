import { GET } from "@/app/api/getRequest";
import { SubmissionHistory } from "@/app/features/history/components/SubmissionHistory/submissionHistory";
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

  return(
    <SubmissionHistory history={data.history}/>
  )
}