export type LinePathProps = {
  RPHistory: number[]
  dataPointSpacing: number
  plotOffsetX: number,
  getPositionY: (value:number)=>number
}

export const LinePath:React.FC<LinePathProps> = ({
  RPHistory, 
  dataPointSpacing, 
  plotOffsetX, 
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
        path += `M ${(i)*dataPointSpacing + plotOffsetX}, ${getPositionY(rp)} `
      }else{
        path += `L ${(i)*dataPointSpacing + plotOffsetX}, ${getPositionY(rp)} M ${(i)*dataPointSpacing + plotOffsetX}, ${getPositionY(rp)} `
      }
    });

    return path
  }
}