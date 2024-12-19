import { HistoryElem } from "@/app/models/pages/history.model"
import { Dispatch, SetStateAction } from "react"

export type DataPointsProps = {
  history: HistoryElem[],
  dataPointsSpacing: number
  getPositionY: (value:number)=>number
  setSelectedHistory: Dispatch<SetStateAction<HistoryElem|null>>
}

export const DataPoints:React.FC<DataPointsProps> = ({history, dataPointsSpacing, getPositionY, setSelectedHistory})=>{
  return <>
    {history.map((historyElem, i) => (
      <>
        <circle 
          key={i} 
          cx={(i+1)*dataPointsSpacing} 
          cy={getPositionY(historyElem.rankPoints)} 
          r={4}
        />
        <circle 
          className="cursor-pointer z-10 absolute"
          key={i} 
          cx={(i+1)*dataPointsSpacing} 
          cy={getPositionY(historyElem.rankPoints)} 
          r={15}
          fill="transparent"
          onClick={()=>setSelectedHistory(historyElem)}
        />
      </>
      
    ))}
  </>
}