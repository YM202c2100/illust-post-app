import { HistoryElem } from "@/app/models/pages/history.model"
import { TickRange } from "../rankPointsGraph"
import { BackGroundRects, BackGroundRectsProps } from "./backGroundRects"
import { DataPoints, DataPointsProps } from "./dataPoints"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TierLabel, TierLabelProps } from "../TierLabel.tsx/tierLabel"
import { LinePath, LinePathProps } from "./linePath"

export type LineChartProps = {
  history:HistoryElem[]
  tickRange: TickRange
  viewWidth: number
  viewHeight: number
  getPositionY: (value:number)=>number
  setSelectedHistory: Dispatch<SetStateAction<HistoryElem|null>>
}

export const LineChart:React.FC<LineChartProps> = ({
  history,
  tickRange,
  viewWidth,
  viewHeight,
  getPositionY,
  setSelectedHistory
})=>{
  

  const RPHistory = history.map(history => history.rankPoints)
  const drawingWidth = (RPHistory.length*100 > viewWidth) ? RPHistory.length*100 : viewWidth
  const dataPointSpacing = drawingWidth/RPHistory.length

  const linePathProps:LinePathProps = {
    RPHistory: RPHistory,
    dataPointSpacing: dataPointSpacing,
    getPositionY: getPositionY
  }
  const backGroundRectsProps:BackGroundRectsProps = {
    tickRange:tickRange,
    getPositionY:getPositionY
  }
  const dataPointsProps: DataPointsProps = {
    history: history,
    dataPointsSpacing: dataPointSpacing,
    getPositionY: getPositionY,
    setSelectedHistory: setSelectedHistory
  }
  const tierLabelProps:TierLabelProps = {
    viewHeight:viewHeight,
    tickMin:tickRange.min,
    getPositionY:getPositionY
  }

  return(
    <div className="overflow-auto" style={{width:`${viewWidth}px`}}>
      <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox={`0 0 ${drawingWidth} ${viewHeight}`} 
        width={drawingWidth} height={viewHeight} 
      >
        <LinePath {...linePathProps}/>
        <BackGroundRects {...backGroundRectsProps}/>
        <DataPoints {...dataPointsProps}/>
        <TierLabel {...tierLabelProps}/>
      </svg>
    </div>
  )
}

