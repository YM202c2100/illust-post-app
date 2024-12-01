import { TickRange, tierRectBoundary } from "../rankPointsGraph"

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
    {maxRP > tierRectBoundary.diamond && 
      <rect y={0} width={"100%"} height={calcHeightPixel(tickRange.max-tierRectBoundary.master)} stroke='black' fill='purple' opacity={0.3}/>
    }

    {[tierRectBoundary.master, 
      tierRectBoundary.diamond, 
      tierRectBoundary.gold   ].map((boundory)=>(
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
      y={getPositionY(tierRectBoundary.silver)} 
      width={"100%"} height={calcHeightPixel(tierRectBoundary.silver)} 
      stroke='black' 
      fill={getColorBelowOneRank(tierRectBoundary.silver)}
      opacity={0.3}
    />
  </>)

  function calcHeightPixel(value:number){
    return Math.abs(getPositionY(value) - getPositionY(0))
  }

  function getColorBelowOneRank(rankTier:number){
    switch (rankTier - gapBetweenTier) {
      case tierRectBoundary.diamond:
        return "blue"
      case tierRectBoundary.gold:
        return "yellow"
      case tierRectBoundary.silver:
        return "gray"
      case tierRectBoundary.bronze:
        return "brown"
    }
  }
}