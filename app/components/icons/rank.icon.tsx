export const BronzeIcon = ()=>{
  return <RankIcon svgSrc="/poll.svg" borderColorHex="border-[#ab7940]"/>
}

export const RankIcon:React.FC<{svgSrc:string, borderColorHex:string}> = ({svgSrc, borderColorHex})=>{
  return(
    <div className={`w-full h-full rounded-full bg-zinc-300 p-4 ${borderColorHex} border-4`}>
      <img src={svgSrc}/>
    </div>
  )
}