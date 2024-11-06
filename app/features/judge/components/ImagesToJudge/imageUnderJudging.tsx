import { Dispatch } from "react"
import { SelectedSide, SelectSideAction } from "./imagesToJudge"


export type ImageUnderJudgingProps = {
  thisSide:NonNullable<SelectedSide>
  selectedSide:SelectedSide
  dispatchSelectedSide:Dispatch<SelectSideAction>
}

export const ImageUnderJudging:React.FC<ImageUnderJudgingProps> = ({thisSide, selectedSide, dispatchSelectedSide})=>{
  return(
    <div 
      className={`snap-center 
        flex-shrink-0 ${(selectedSide===thisSide) ? "md:flex-grow-1.2":"md:flex-grow"}
        w-full md:w-auto 
        md:flex flex-col justify-center
        transition-[flex-grow] ease-in bg-red-500`}
      onClick={()=>{dispatchSelectedSide({type:thisSide})}}
    >
      <div className="w-full aspect-square bg-red-300"></div>
    </div>
  )
}