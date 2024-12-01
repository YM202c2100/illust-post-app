import { TierLabel } from "../TierLabel.tsx/tierLabel"
import { LineChart } from "./LineChart/lineChart"

export const RankPointsGraph:React.FC<{rankPointsHistory:number[]}> = ({rankPointsHistory})=>{
  return(
    <div className="flex justify-center">
      <TierLabel/>
      <LineChart RPHistory={rankPointsHistory}/>
    </div>
  )
}