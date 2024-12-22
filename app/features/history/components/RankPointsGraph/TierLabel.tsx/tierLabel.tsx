import { tierRectBoundary } from "../rankPointsGraph"

export type TierLabelProps = {
  viewHeight:number
  tickMin:number
  getPositionY:(value:number)=>number
}

export const TierLabel:React.FC<TierLabelProps> = ({viewHeight, tickMin, getPositionY})=>{
  const offsetX = 3
  const offsetY = 3
  const tierBoundaryPairs = Object.entries(tierRectBoundary)
  
  return(
    <g>
      {tierBoundaryPairs.map(([key, value]) => {
        if(key !== "bronze"){
          return(
            <text key={key} x={offsetX} y={getPositionY(value) - offsetY} textAnchor="start">{key}</text>
          )
        }
      })}
      <text x={offsetX} y={viewHeight - offsetY} textAnchor="start">{getLowerLimitLabel(tickMin)}</text>
    </g>
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