import { RankIcon } from "@/app/components/icons/rank.icon"
import { RankPoints } from "@/app/models/rankTier.model"
import Image from "next/image"

export const RankFluctuation:React.FC<{beforeRP:RankPoints, afterRP:RankPoints}> = ({beforeRP, afterRP})=>{
  return(
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
          <RankIcon rankPoints={afterRP} />
        </div>
        <div className="text-xl">{afterRP} RP</div>
      </div>
    </div>
  )
}