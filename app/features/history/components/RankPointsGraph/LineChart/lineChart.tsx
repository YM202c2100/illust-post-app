import { HistoryElem } from "@/app/models/pages/history.model"
import { TickRange } from "../rankPointsGraph"
import { BackGroundRects, BackGroundRectsProps } from "./backGroundRects"
import { DataPoints, DataPointsProps } from "./dataPoints"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export type LineChartProps = {
  history:HistoryElem[]
  tickRange: TickRange
  viewHeight: number,
  getPositionY: (value:number)=>number
  setSelectedHistory: Dispatch<SetStateAction<HistoryElem|null>>
}

export const LineChart:React.FC<LineChartProps> = ({
  history,
  tickRange,
  viewHeight,
  getPositionY,
  setSelectedHistory
})=>{
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

  const RPHistory = history.map(history => history.rankPoints)
  const drawingWidth = (RPHistory.length*100 > viewWidth) ? RPHistory.length*100 : viewWidth
  const dataPointSpacing = drawingWidth/RPHistory.length

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

  return(
    <div className="overflow-auto" style={{width:`${viewWidth}px`}}>
      <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox={`0 0 ${drawingWidth} ${viewHeight}`} 
        width={drawingWidth} height={viewHeight} 
      >
        <path 
          d={getPath(RPHistory)}
          stroke="red"
          strokeWidth={2}
        />
        <BackGroundRects {...backGroundRectsProps}/>
        <DataPoints {...dataPointsProps}/>
        <rect x='0' y='0' width='100%' height='100%' stroke='cadetblue' strokeWidth={4} fill='none' />
      </svg>
    </div>
  )

  function getPath(RankPointsArray:number[]):string{
    let path = ""
    RankPointsArray.forEach((rp, i) => {
      if(i === 0){
        path += `M ${dataPointSpacing}, ${getPositionY(rp)} `
      }else{
        path += `L ${(i+1)*dataPointSpacing}, ${getPositionY(rp)} M ${(i+1)*dataPointSpacing}, ${getPositionY(rp)} `
      }
    });

    return path
  }
}

