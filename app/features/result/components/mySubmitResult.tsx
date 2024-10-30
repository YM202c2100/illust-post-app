import { convertToValidSrc } from "@/app/libs/helper"
import { ResultDataGET } from "@/app/models/pages/result.model"

export const MySubmitResult:React.FC<ResultDataGET> = ({rankPosition, totalNumCompetitors, beforeRP, myImage})=>{
  const myImgSrc = convertToValidSrc(myImage.file_name)
  const percentail = Math.round(rankPosition/totalNumCompetitors*100)

  return(
    <div className="text-2xl">
      <div className="text-3xl">投稿した作品</div>

      <div className="grid grid-cols-2 items-center">
        <div className="justify-self-end">
          <img src={myImgSrc} width={400} />
        </div>
        <div>
          <div>RP:{beforeRP ?? "---"}</div>
          <div>↓</div>
          <div>RP:{myImage.rank_points}</div>
          <div>
            順位:{rankPosition}/{totalNumCompetitors}
          </div>
          <div>上位:{percentail}%</div>
        </div>
      </div>
    </div>
  )
}