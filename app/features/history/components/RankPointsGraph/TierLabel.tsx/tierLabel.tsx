import { tierRectBoundary } from "../rankPointsGraph"

export type TierLabelProps = {
  viewHeight:number
  tickMin:number
  getPositionY:(value:number)=>number
}

export const TierLabel:React.FC<TierLabelProps> = ({viewHeight, tickMin, getPositionY})=>{
  const viewWidth = 80
  const tierBoundaryPairs = Object.entries(tierRectBoundary)
  
  return(
    <svg xmlns="http://www.w3.org/2000/svg" 
      viewBox={`0 0 ${viewWidth} ${viewHeight}`} 
      width={viewWidth} height={viewHeight}
    >
      {tierBoundaryPairs.map(([key, value]) => {
        if(key !== "bronze"){
          return(
            <text key={key} x={viewWidth} y={getPositionY(value)} textAnchor="end">{key}</text>
          )
        }
      })}
      <text x={viewWidth} y={viewHeight} textAnchor="end">{getLowerLimitLabel(tickMin)}</text>
    </svg>
  )

  function getLowerLimitLabel(tickMin:number){
    const tierBoundaryPairsDesc = tierBoundaryPairs.toReversed()
    for (const [tierLabel, boundaryValue] of tierBoundaryPairsDesc){
      if(tickMin >= boundaryValue){
        return tierLabel
      }
    }

    return "bronze"
  }
}