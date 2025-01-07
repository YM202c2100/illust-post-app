"use client"
import { HistoryElem } from "@/app/models/pages/history.model"
import { RankPointsGraph } from "./RankPointsGraph/rankPointsGraph"
import { useState } from "react"
import { HistoryDetail } from "./HistoryDetail/historyDetail"

export const SubmissionHistory:React.FC<{history:HistoryElem[]}> = ({history})=>{
  const [selectedHistory, setSelectedHistory] = useState<HistoryElem|null>(null)

  return(
    <div>
      <p className="text-3xl text-center">過去のランクポイント推移</p>
      <RankPointsGraph history={history} setSelectedHistory={setSelectedHistory}/>
      {selectedHistory && 
        <HistoryDetail selectedHistory={selectedHistory}/>
      }
    </div>
  )
}