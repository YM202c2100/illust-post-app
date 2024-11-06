import { Dispatch } from "react"
import { SelectedSide, SelectSideAction } from "./imagesToJudge"
import { ImageToJudge } from "@/app/models/pages/judge.model"
import { convertToValidSrc } from "@/app/libs/helper"
import Image from "next/image"


export type ImageUnderJudgingProps = {
  images:ImageToJudge[]
  thisSide:NonNullable<SelectedSide>
  selectedSide:SelectedSide
  dispatchSelectedSide:Dispatch<SelectSideAction>
}

export const ImageUnderJudging:React.FC<ImageUnderJudgingProps> = ({images, thisSide, selectedSide, dispatchSelectedSide})=>{
  const idx = (thisSide === "left") ? 0:1
  const imgSrc = convertToValidSrc(images[idx].file_name)

  return(
    <div 
      className={`snap-center 
        flex-shrink-0 ${(selectedSide===thisSide) ? "md:flex-grow-1.2":"md:flex-grow"}
        w-full md:w-auto 
        md:flex flex-col justify-center
        transition-[flex-grow] ease-in bg-red-500`}
      onClick={()=>{dispatchSelectedSide({type:thisSide})}}
    >
      <div className="w-full aspect-square bg-red-300 p-4">
        <div className="relative w-full h-full rounded-xl">
          <Image src={imgSrc} 
            alt={"image to judge"}
            fill style={{objectFit:"contain"}}
            sizes="(max-width 768px) 90vw, 50vw"
          />
        </div>
      </div>
    </div>
  )
}