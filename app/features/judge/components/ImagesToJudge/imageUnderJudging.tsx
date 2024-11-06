import { Dispatch, SetStateAction } from "react"
import { SelectedSide } from "./imagesToJudge"


export type ImageUnderJudgingProps = {
  thisSide:NonNullable<SelectedSide>
  selectedSide:SelectedSide
  setSelectedSide:Dispatch<SetStateAction<SelectedSide>>
}

export const ImageUnderJudging:React.FC<ImageUnderJudgingProps> = ({thisSide, selectedSide, setSelectedSide})=>{
  return(
    <div 
      className={`snap-center 
        flex-shrink-0 ${(selectedSide===thisSide) ? "md:flex-grow-1.2":"md:flex-grow"}
        w-full md:w-auto 
        md:flex flex-col justify-end
        transition-[flex-grow] bg-red-500`}
      onClick={()=>{setSelectedSide(thisSide)}}
    >
      <div className="w-full aspect-square bg-red-300"></div>
    </div>
  )
}