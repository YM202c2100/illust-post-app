import { convertToValidSrc } from "@/app/libs/helper"
import { ResultDataGET } from "@/app/models/pages/result.model"
import { RankFluctuation } from "./rankFluctuation"

export const SubmissionResult:React.FC<ResultDataGET> = ({rankPosition, totalNumCompetitors, beforeRP, myImage})=>{
  const myImgSrc = convertToValidSrc(myImage.file_name)

  return(
    <div className="text-2xl">
      <div className="text-3xl">投稿した作品</div>

      <div className="md:grid grid-cols-2 items-center">
        {/* next/Imageを使うとアスペクト比が不明のため無駄な余白が生じるためimgを使用 */}
        <img src={myImgSrc}
          alt="my sumitted illust" 
          className="ml-auto max-h-[500px]"
        />

        <div className="mt-10">
          <RankFluctuation beforeRP={beforeRP} afterRP={myImage.rank_points}/>
          <div className="text-center">
            順位: {rankPosition}/{totalNumCompetitors}
          </div>
        </div>
      </div>
    </div>
  )
}