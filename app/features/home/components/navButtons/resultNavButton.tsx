import { BronzeIcon } from "@/app/components/icons/rank.icon"
import Link from "next/link"

export const ResultNavButton:React.FC = ()=>{
  return(
    <Link href={"result"} className="h-full bg-zinc-800 text-white rounded-2xl p-2 flex justify-between">
      <div>コンテスト結果</div>
      <div className="w-[40%] aspect-square self-center mr-2">
        <BronzeIcon/>
      </div>
    </Link>
  )
}