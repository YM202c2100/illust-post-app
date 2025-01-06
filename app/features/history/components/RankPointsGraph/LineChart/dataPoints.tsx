import { HistoryElem } from "@/app/models/pages/history.model"
import { Dispatch, SetStateAction } from "react"

export type DataPointsProps = {
  history: HistoryElem[],
  dataPointsSpacing: number
  plotOffsetX: number,
  getPositionY: (value:number)=>number
  setSelectedHistory: Dispatch<SetStateAction<HistoryElem|null>>
}

export const DataPoints:React.FC<DataPointsProps> = ({history, dataPointsSpacing, plotOffsetX, getPositionY, setSelectedHistory})=>{
  return <>
    {history.map((historyElem, i) => (
      <g key={i}>
        <circle 
          cx={(i)*dataPointsSpacing + plotOffsetX} 
          cy={getPositionY(historyElem.rankPoints)} 
          r={4}
        />
        <circle 
          className="cursor-pointer z-10 absolute"
          cx={(i)*dataPointsSpacing + plotOffsetX} 
          cy={getPositionY(historyElem.rankPoints)} 
          r={15}
          fill="transparent"
          onClick={()=>setSelectedHistory(historyElem)}
        />
      </g>
    ))}
  </>
}