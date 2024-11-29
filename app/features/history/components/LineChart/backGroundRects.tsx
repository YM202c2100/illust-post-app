import { rankTierBoundary, TickRange } from "../lineChart"

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
  const maxRP = tickRange.max - padding

  return(<>
    {maxRP > rankTierBoundary.diamond && 
      <rect y={0} width={"100%"} height={calcHeightPixel(tickRange.max-rankTierBoundary.master)} stroke='black' fill='purple' opacity={0.3}/>
    }

    {[rankTierBoundary.master, 
      rankTierBoundary.diamond, 
      rankTierBoundary.gold   ].map((boundory)=>(
      <rect 
        key={boundory}
        y={getPositionY(boundory)} 
        width={"100%"} height={calcHeightPixel(gapBetweenTier)} 
        stroke='black' 
        fill={getColorBelowOneRank(boundory)}
        opacity={0.3}
      />
    ))}

    <rect 
      y={getPositionY(rankTierBoundary.silver)} 
      width={"100%"} height={calcHeightPixel(rankTierBoundary.silver)} 
      stroke='black' 
      fill={getColorBelowOneRank(rankTierBoundary.silver)}
      opacity={0.3}
    />
  </>)

  function calcHeightPixel(value:number){
    return Math.abs(getPositionY(value) - getPositionY(0))
  }

  function getColorBelowOneRank(rankTier:number){
    switch (rankTier - gapBetweenTier) {
      case rankTierBoundary.diamond:
        return "blue"
      case rankTierBoundary.gold:
        return "yellow"
      case rankTierBoundary.silver:
        return "gray"
      case rankTierBoundary.bronze:
        return "brown"
    }
  }
}