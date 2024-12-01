import { TierLabel, TierLabelProps } from "../TierLabel.tsx/tierLabel"
import { LineChart, LineChartProps } from "./LineChart/lineChart"

export type TickRange = {
  min: number,
  max: number, 
  diff: number
}

export const tierRectBoundary = {
  bronze:1000,
  silver:1250,
  gold:1500,
  diamond:1750,
  master:2000
}

export const RankPointsGraph:React.FC<{rankPointsHistory:number[]}> = ({rankPointsHistory})=>{
  const viewHeight = 600
  const padding = 50
  const tickRange = getTickRange(rankPointsHistory)

  const tierLabelProps:TierLabelProps = {
    viewHeight:viewHeight,
    tickMin:tickRange.min,
    getPositionY:getPositionY
  }
  const lineChartProps:LineChartProps = {
    RPHistory:rankPointsHistory,
    tickRange:tickRange,
    viewHeight:viewHeight,
    getPositionY:getPositionY
  }

  return(
    <div className="flex justify-center">
      <TierLabel {...tierLabelProps}/>
      <LineChart {...lineChartProps}/>
    </div>
  )

  function getTickRange(RPHistory:number[]):TickRange{
    const maxRP = Math.max(...RPHistory)
    const minRP = Math.min(...RPHistory)
    const tickRange = {max:0, min:0, diff:0}

    const tierBoundaryValues = Object.values(tierRectBoundary)
    for (let i=0; i<tierBoundaryValues.length; i++){
      tickRange.max = maxRP + padding

      if(maxRP <= tierBoundaryValues[i]){
        tickRange.max = tierBoundaryValues[i] + padding
        break;
      }
    }

    for (let i=0; i<tierBoundaryValues.length; i++){
      tickRange.min = (minRP<=padding) ? minRP : minRP - padding

      if(minRP >= tierBoundaryValues.toReversed()[i]){
        tickRange.min = tierBoundaryValues.toReversed()[i] - padding
        break;
      }
    }

    tickRange.diff = tickRange.max - tickRange.min

    return tickRange
  }

  function getPositionY(value: number){
    const ratio = (value-tickRange.min)/tickRange.diff
    return viewHeight - (ratio * viewHeight)
  }
}