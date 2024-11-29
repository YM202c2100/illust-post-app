import { TickRange } from "../lineChart"

export type BackGroundRectsProps = {
  tickRange: TickRange
  padding: number
  getPositionY: (value:number)=>number
}

export const BackGroundRects:React.FC<BackGroundRectsProps> = ({
  tickRange, 
  padding, 
  getPositionY
})=>{
  const gapBetweenTier = 250
  const numOfRectsWithoutPadding = (tickRange.diff - 2*padding)/gapBetweenTier
  const maxRP = tickRange.max - padding
  const bottomPaddingPosition = getPositionY(maxRP - numOfRectsWithoutPadding*gapBetweenTier)

  return(<>
    <rect y={0} width={"100%"} height={calcHeightPixel(padding)} stroke='black' fill='blue' opacity={0.3}/>
    {[...Array(numOfRectsWithoutPadding)].map((_, i)=>(
      <rect 
        y={getPositionY(maxRP - i*gapBetweenTier)} 
        width={"100%"} 
        height={calcHeightPixel(gapBetweenTier)} 
        stroke='black' 
        fill='yellow' 
        opacity={0.3}
      />
    ))}
    <rect y={bottomPaddingPosition} width={"100%"} height={calcHeightPixel(padding)} stroke='black' fill='blue' opacity={0.3}/>
  </>)

  function calcHeightPixel(value:number){
    return Math.abs(getPositionY(value) - getPositionY(0))
  }
}