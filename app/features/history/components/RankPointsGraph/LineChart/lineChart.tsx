import { TickRange } from "../rankPointsGraph"
import { BackGroundRects, BackGroundRectsProps } from "./backGroundRects"

export type LineChartProps = {
  RPHistory:number[]
  tickRange: TickRange
  viewHeight: number,
  getPositionY: (value:number)=>number
}

export const LineChart:React.FC<LineChartProps> = ({
  RPHistory,
  tickRange,
  viewHeight,
  getPositionY
})=>{
  const viewWidth = 800
  const drawingWidth = (RPHistory.length*100 > viewWidth) ? RPHistory.length*100 : viewWidth

  const backGroundRectsProps:BackGroundRectsProps = {
    tickRange:tickRange,
    getPositionY:getPositionY
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
        <rect x='0' y='0' width='100%' height='100%' stroke='cadetblue' strokeWidth={4} fill='none' />
      </svg>
    </div>
  )

  function getPath(RankPointsArray:number[]):string{
    const dataPointSpacing = drawingWidth/RPHistory.length
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

