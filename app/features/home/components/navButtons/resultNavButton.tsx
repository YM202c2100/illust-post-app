import { RankIcon } from "@/app/components/icons/rank.icon"
import Link from "next/link"

export const ResultNavButton:React.FC<{rankPoints:number|null}> = ({rankPoints})=>{
  return(
    <Link href={"result"} className="h-full bg-zinc-800 md:text-2xl text-white rounded-2xl p-2 flex justify-between">
      <div>コンテスト結果</div>
      <div className="w-[40%] aspect-square self-center mr-2">
        <RankIcon rankPoints={rankPoints}/>
      </div>
    </Link>
  )
}