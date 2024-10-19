import { convertToValidSrc } from "@/app/libs/helper"
import { ResultDataGET } from "@/app/models/result.model"

export const MySubmitResult:React.FC<ResultDataGET> = ({rankPosition, totalNumCompetitors, beforeRP, myImage})=>{
  const myImgSrc = convertToValidSrc(myImage.file_name)
  const percentail = Math.round(rankPosition/totalNumCompetitors*100)

  return(
    <div className="flex justify-center">
        <img src={myImgSrc}/>
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
  )
}