export type LinePathProps = {
  RPHistory: number[]
  dataPointSpacing: number
  getPositionY: (value:number)=>number
}

export const LinePath:React.FC<LinePathProps> = ({
  RPHistory, 
  dataPointSpacing, 
  getPositionY
})=>{
  return(
    <path 
      d={getPath(RPHistory)}
      stroke="red"
      strokeWidth={2}
    />
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