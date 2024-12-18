import { convertToValidSrc, formatDate } from "@/app/libs/helper"
import { HistoryElem } from "@/app/models/pages/history.model"
import Image from "next/image"

export const HistoryDetail:React.FC<{selectedHistory:HistoryElem}> = ({selectedHistory})=>{
  return(
    <div 
      className="w-[80%] max-w-[1000px] aspect-[2] mx-auto 
        grid grid-cols-2 
        border-gray-400 border-2 rounded-xl
        mt-10"
    >
      <div className="relative">
        <Image src={convertToValidSrc(selectedHistory.filePath)}
          alt="submitted illust"
          fill
          style={{objectFit:"contain"}}
        />
      </div>
      <div>
        <p>{formatDate(selectedHistory.contest.judgeEndDate)}</p>
        <p>第{selectedHistory.contest.roundNum}回コンテスト結果</p>
        <p>お題：{selectedHistory.contest.subject}</p>
        <p>最終ランクポイント：{selectedHistory.rankPoints}</p>
      </div>
    </div>
  )
}