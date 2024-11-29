export const LineChart:React.FC<{RPHistory:number[]}> = ({RPHistory})=>{
  const viewWidth = 800
  const viewHeight = 600
  const tickRange = getTickRange(RPHistory)

  let path = ""
  RPHistory.forEach((rp, i) => {
    if(i === 0){
      path += `M ${viewWidth/10}, ${getPositionY(rp)} `
    }else{
      path += `L ${(i+1)*viewWidth/10}, ${getPositionY(rp)} M ${(i+1)*viewWidth/10}, ${getPositionY(rp)} `
    }
  });

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
        <rect width={viewWidth}/>
        <rect x='0' y='0' width='100%' height='100%' stroke='cadetblue' strokeWidth={4} fill='none' />
      </svg>
    </div>
  )

  function getTickRange(RPHistory:number[]){
    const maxRP = Math.max(...RPHistory)
    const minRP = Math.min(...RPHistory)
    
    const rankTierBoundary = {
      bronze:1000,
      silver:1250,
      gold:1500,
      diamond:1750,
      master:2000
    }

    const tickRange = {max:0, min:0}

    const rankTierArray = Object.values(rankTierBoundary)
    for (let i=0; i<rankTierArray.length; i++){
      tickRange.max = maxRP+50

      if(maxRP <= rankTierArray[i]){
        tickRange.max = rankTierArray[i]+50
        break;
      }
    }

    for (let i=0; i<rankTierArray.length; i++){
      tickRange.min = (minRP===0) ? minRP : minRP-50

      if(minRP >= rankTierArray.toReversed()[i]){
        tickRange.min = rankTierArray.toReversed()[i] - 50
        break;
      }
    }
    return tickRange
  }

  function getPositionY(value: number){
    const ratio = (value-tickRange.min)/(tickRange.max - tickRange.min)
    return viewHeight - (ratio * viewHeight)
  }
}

