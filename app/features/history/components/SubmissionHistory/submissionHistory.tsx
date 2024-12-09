"use client"
import { HistoryElem } from "@/app/models/pages/history.model"
import { RankPointsGraph } from "../RankPointsGraph/rankPointsGraph"

export const SubmissionHistory:React.FC<{history:HistoryElem[]}> = ({history})=>{
  return(
    <RankPointsGraph history={history}/>
  )
}