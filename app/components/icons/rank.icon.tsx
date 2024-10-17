export const BronzeIcon = ()=>{
  return <RankIcon svgSrc="/poll.svg" borderColorHex="border-[#ab7940]"/>
}

export const SilverIcon = ()=>{
  return <RankIcon svgSrc="/knight.svg" borderColorHex="border-[#acb2b5]"/>
}

export const GoldIcon = ()=>{
  return <RankIcon svgSrc="/bishop.svg" borderColorHex="border-[#fae093]"/>
}

export const DiamondIcon = ()=>{
  return <RankIcon svgSrc="/rook.svg" borderColorHex="border-[#a3c2ec]"/>
}

export const MasterIcon = ()=>{
  return <RankIcon svgSrc="/queen.svg" borderColorHex="border-[#ab73ce]"/>
}

export const RankIcon:React.FC<{svgSrc:string, borderColorHex:string}> = ({svgSrc, borderColorHex})=>{
  return(
    <div className={`w-full h-full rounded-sm bg-slate-900 p-4 ${borderColorHex} border-4`}>
      <img src={svgSrc}/>
    </div>
  )
}