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

  const backGroundRectsProps:BackGroundRectsProps = {
    tickRange:tickRange,
    getPositionY:getPositionY
  }

  return(
    <svg xmlns="http://www.w3.org/2000/svg" 
      viewBox={`0 0 ${viewWidth} ${viewHeight}`} 
      width={viewWidth} height={viewHeight} 
    >
      <path 
        d={getPath(RPHistory)}
        stroke="red"
        strokeWidth={2}
      />
      <BackGroundRects {...backGroundRectsProps}/>
      <rect x='0' y='0' width='100%' height='100%' stroke='cadetblue' strokeWidth={4} fill='none' />
    </svg>
  )

  function getPath(RankPointsArray:number[]):string{
    let path = ""
    RankPointsArray.forEach((rp, i) => {
      if(i === 0){
        path += `M ${viewWidth/10}, ${getPositionY(rp)} `
      }else{
        path += `L ${(i+1)*viewWidth/10}, ${getPositionY(rp)} M ${(i+1)*viewWidth/10}, ${getPositionY(rp)} `
      }
    });

    return path
  }
}

