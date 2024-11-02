import { RankIcon } from "@/app/components/icons/rank.icon"
import { convertToValidSrc } from "@/app/libs/helper"
import { ResultDataGET } from "@/app/models/pages/result.model"
import Image from "next/image"

export const MySubmitResult:React.FC<ResultDataGET> = ({rankPosition, totalNumCompetitors, beforeRP, myImage})=>{
  const myImgSrc = convertToValidSrc(myImage.file_name)

  return(
    <div className="text-2xl">
      <div className="text-3xl">投稿した作品</div>

      <div className="md:grid grid-cols-2 items-center">
        <div className="justify-self-end">
          <img src={myImgSrc} width={400} />
        </div>
        <div>
          <div className="flex justify-around items-center">
            <div className="w-[30%] text-center">
              <div className="aspect-square relative">
                <RankIcon rankPoints={beforeRP} />
              </div>
              <div className="text-xl">{beforeRP} RP</div>
            </div>

            <div className="w-[10%] aspect-square relative">
              <Image src={"/SVG/rightArrow.svg"} 
                alt="right arrow" 
                fill style={{objectFit:"cover"}}
                sizes="20vw"
              />
            </div>

            <div className="w-[30%] text-center">
              <div className="aspect-square relative">
                <RankIcon rankPoints={myImage.rank_points} />
              </div>
              <div className="text-xl">{myImage.rank_points} RP</div>
            </div>
          </div>
          <div className="text-center">
            順位: {rankPosition}/{totalNumCompetitors}
          </div>
        </div>
      </div>
    </div>
  )
}