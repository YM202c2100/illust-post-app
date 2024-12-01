import { RankPointsGraph } from "@/app/features/history/components/RankPointsGraph/rankPointsGraph";

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
    <RankPointsGraph rankPointsHistory={rankPointsHistory}/>
  )
}