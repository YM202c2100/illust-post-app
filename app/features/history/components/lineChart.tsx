import { BackGroundRects, BackGroundRectsProps } from "./LineChart/backGroundRects"

export type TickRange = {
  min: number,
  max: number, 
  diff: number
}

export const LineChart:React.FC<{RPHistory:number[]}> = ({RPHistory})=>{
  const viewWidth = 800
  const viewHeight = 600
  const padding = 50
  const tickRange = getTickRange(RPHistory)

  let path = ""
  RPHistory.forEach((rp, i) => {
    if(i === 0){
      path += `M ${viewWidth/10}, ${getPositionY(rp)} `
    }else{
      path += `L ${(i+1)*viewWidth/10}, ${getPositionY(rp)} M ${(i+1)*viewWidth/10}, ${getPositionY(rp)} `
    }
  });

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
          d={path}
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
    
    const rankTierBoundary = {
      bronze:1000,
      silver:1250,
      gold:1500,
      diamond:1750,
      master:2000
    }

    const tickRange = {max:0, min:0, diff:0}

    const rankTierArray = Object.values(rankTierBoundary)
    for (let i=0; i<rankTierArray.length; i++){
      tickRange.max = maxRP + padding

      if(maxRP <= rankTierArray[i]){
        tickRange.max = rankTierArray[i] + padding
        break;
      }
    }

    for (let i=0; i<rankTierArray.length; i++){
      tickRange.min = (minRP===0) ? minRP : minRP - padding

      if(minRP >= rankTierArray.toReversed()[i]){
        tickRange.min = rankTierArray.toReversed()[i] - padding
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

