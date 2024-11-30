import { BackGroundRects, BackGroundRectsProps } from "./backGroundRects"

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

export const LineChart:React.FC<{RPHistory:number[]}> = ({RPHistory})=>{
  const viewWidth = 800
  const viewHeight = 600
  const padding = 50
  const tickRange = getTickRange(RPHistory)

  const backGroundRectsProps:BackGroundRectsProps = {
    tickRange:tickRange,
    padding:padding,
    getPositionY:getPositionY
  }

  return(
    <div className="mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" 
        viewBox={`0 0 ${viewWidth} ${viewHeight}`} 
        width={viewWidth} height={viewHeight} 
        className="mx-auto"
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
      tickRange.min = (minRP===0) ? minRP : minRP - padding

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

