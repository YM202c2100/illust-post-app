import {LineChart} from "@/app/features/history/components/RankPointsGraph/LineChart/lineChart";
import { TierLabel } from "@/app/features/history/components/TierLabel.tsx/tierLabel";

export default function History(){
  const rankPointsHistory = [
    1500,
    1500,
    1520,
    1523,
    1530,
    1510,
    1520,
    1521,
    1532,
    1504,
    1550
  ];

  return(
    <LineChart RPHistory={rankPointsHistory}/>
  )
}