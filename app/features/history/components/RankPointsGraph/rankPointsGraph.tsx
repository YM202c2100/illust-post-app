import { HistoryElem } from "@/app/models/pages/history.model"
import { LineChart, LineChartProps } from "./LineChart/lineChart"
import { TierLabel, TierLabelProps } from "./TierLabel.tsx/tierLabel"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

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

export const RankPointsGraph:React.FC<{history:HistoryElem[], setSelectedHisotry:Dispatch<SetStateAction<HistoryElem|null>>}> = ({history, setSelectedHisotry})=>{
  const [viewWidth, setViewWidth] = useState<number>(800)
  useEffect(()=>{
    function calcViewWidth(){
      if(window.innerWidth > 1000){
        setViewWidth(800)
      }else{
        setViewWidth(window.innerWidth * 0.8)
      }
    }

    calcViewWidth()

    window.addEventListener("resize", calcViewWidth)

    return ()=>{
      window.removeEventListener("resize", calcViewWidth)
    }
  },[])

  const viewHeight = viewWidth * 3/4
  const padding = 50
  const rankPointsHistory = history.map(history => history.rankPoints)
  const tickRange = getTickRange(rankPointsHistory)

  const lineChartProps:LineChartProps = {
    history:history,
    tickRange:tickRange,
    viewWidth:viewWidth,
    viewHeight:viewHeight,
    getPositionY:getPositionY,
    setSelectedHistory: setSelectedHisotry
  }

  return(
    <div className="flex justify-center">
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