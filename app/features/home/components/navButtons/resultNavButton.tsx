import { RankIconBronze } from "@/app/components/icons/rank.icon"
import Link from "next/link"

export const ResultNavButton:React.FC = ()=>{
  return(
    <Link href={"result"} className="block h-full bg-zinc-800 text-white rounded-2xl">
      <div>コンテスト結果</div>
      <div className="h-[70%] aspect-square">
        <RankIconBronze/>
      </div>
    </Link>
  )
}