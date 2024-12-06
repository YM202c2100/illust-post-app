import { HistoryElem } from "@/app/models/pages/history.model"

export type DataPointsProps = {
  history: HistoryElem[],
  dataPointsSpacing: number
  getPositionY: (value:number)=>number
}

export const DataPoints:React.FC<DataPointsProps> = ({history, dataPointsSpacing, getPositionY})=>{
  return <>
    {history.map((history, i) => (
      <circle key={i} cx={(i+1)*dataPointsSpacing} cy={getPositionY(history.rankPoints)} r={4}/>
    ))}
  </>
}