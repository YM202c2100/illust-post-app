import { RankTier } from "@/app/models/pages/home.model"

export const GetIconByRankTier:React.FC<{rankTier:RankTier}> = ({rankTier})=>{
  switch (rankTier) {
    case "bronze":
      return <BronzeIcon/>
    case "silver":
      return <SilverIcon/>
    case "gold":
      return <GoldIcon/>
    case "diamond":
      return <DiamondIcon/>
    case "master":
      return <MasterIcon/>
  }
}

export const BronzeIcon = ()=>{
  return <RankIcon svgSrc="/SVG/poll.svg" borderColorHex="border-[#ab7940]"/>
}

export const SilverIcon = ()=>{
  return <RankIcon svgSrc="/SVG/knight.svg" borderColorHex="border-[#acb2b5]"/>
}

export const GoldIcon = ()=>{
  return <RankIcon svgSrc="/SVG/bishop.svg" borderColorHex="border-[#fae093]"/>
}

export const DiamondIcon = ()=>{
  return <RankIcon svgSrc="/SVG/rook.svg" borderColorHex="border-[#a3c2ec]"/>
}

export const MasterIcon = ()=>{
  return <RankIcon svgSrc="/SVG/queen.svg" borderColorHex="border-[#ab73ce]"/>
}

export const RankIcon:React.FC<{svgSrc:string, borderColorHex:string}> = ({svgSrc, borderColorHex})=>{
  return(
    <div className={`w-full h-full rounded-sm bg-slate-900 p-4 ${borderColorHex} border-4`}>
      <img src={svgSrc}/>
    </div>
  )
}