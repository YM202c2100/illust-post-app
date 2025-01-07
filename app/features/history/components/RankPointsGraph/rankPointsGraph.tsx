import { HistoryElem } from "@/app/models/pages/history.model"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { LinePath, LinePathProps } from "./LineChart/linePath"
import { BackGroundRects, BackGroundRectsProps } from "./LineChart/backGroundRects"
import { DataPoints, DataPointsProps } from "./LineChart/dataPoints"
import { TierLabel, TierLabelProps } from "./TierLabel.tsx/tierLabel"
import { useViewWidth } from "../../hooks/useViewWidth"

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

export const RankPointsGraph:React.FC<{history:HistoryElem[], setSelectedHistory:Dispatch<SetStateAction<HistoryElem|null>>}> = ({history, setSelectedHistory})=>{
  const viewWidth = useViewWidth()

  const RPHistory = history.map(history => history.rankPoints)

  const viewHeight = viewWidth * 3/4
  const drawingWidth = (RPHistory.length*100 > viewWidth) ? RPHistory.length*100 : viewWidth

  const paddingY = 50
  const offsetX = 80
  const tickRange = getTickRange(RPHistory)
  const dataPointSpacing = drawingWidth/RPHistory.length

  const linePathProps:LinePathProps = {
    RPHistory: RPHistory,
    dataPointSpacing: dataPointSpacing,
    plotOffsetX: offsetX,
    getPositionY: getPositionY
  }
  const backGroundRectsProps:BackGroundRectsProps = {
    tickRange:tickRange,
    getPositionY:getPositionY
  }
  const dataPointsProps: DataPointsProps = {
    history: history,
    dataPointsSpacing: dataPointSpacing,
    plotOffsetX: offsetX,
    getPositionY: getPositionY,
    setSelectedHistory: setSelectedHistory
  }
  const tierLabelProps:TierLabelProps = {
    viewHeight:viewHeight,
    tickMin:tickRange.min,
    getPositionY:getPositionY
  }

  return(
    <div 
      className="overflow-auto mx-auto mt-3" 
      style={{width:`${viewWidth}px`}}
    >
      <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox={`0 0 ${drawingWidth} ${viewHeight}`} 
        width={drawingWidth} height={viewHeight} 
      >
        <LinePath {...linePathProps}/>
        <BackGroundRects {...backGroundRectsProps}/>
        <TierLabel {...tierLabelProps}/>
        <DataPoints {...dataPointsProps}/>
      </svg>
    </div>
  )

  function getTickRange(RPHistory:number[]):TickRange{
    const maxRP = Math.max(...RPHistory)
    const minRP = Math.min(...RPHistory)
    const tickRange = {max:0, min:0, diff:0}

    const tierBoundaryValues = Object.values(tierRectBoundary)
    for (let i=0; i<tierBoundaryValues.length; i++){
      tickRange.max = maxRP + paddingY

      if(maxRP <= tierBoundaryValues[i]){
        tickRange.max = tierBoundaryValues[i] + paddingY
        break;
      }
    }

    for (let i=0; i<tierBoundaryValues.length; i++){
      tickRange.min = (minRP<=paddingY) ? minRP : minRP - paddingY

      if(minRP >= tierBoundaryValues.toReversed()[i]){
        tickRange.min = tierBoundaryValues.toReversed()[i] - paddingY
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