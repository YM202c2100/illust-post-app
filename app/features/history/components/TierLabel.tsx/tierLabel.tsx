import { tierRectBoundary } from "../RankPointsGraph/rankPointsGraph"

export type TierLabelProps = {
  viewHeight:number
  getPositionY:(value:number)=>number
}

export const TierLabel:React.FC<TierLabelProps> = ({viewHeight, getPositionY})=>{
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
      <text x={viewWidth} y={viewHeight} textAnchor="end">bronze</text>
    </svg>
  )
}