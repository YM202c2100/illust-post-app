import { getRankTierbyRP } from "@/app/models/rankTier.model"
import Image from "next/image"

export const RankIcon:React.FC<{rankPoints:number|null}> = ({rankPoints})=>{
  const rankTier = getRankTierbyRP(rankPoints)
  switch (rankTier) {
    case null:
      return <UnRankIcon/>
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

export const UnRankIcon = ()=>{
  return <RankIconBase svgSrc="/SVG/question.svg" borderColorHex="border-[#414141]"/>
}

export const BronzeIcon = ()=>{
  return <RankIconBase svgSrc="/SVG/poll.svg" borderColorHex="border-[#ab7940]"/>
}

export const SilverIcon = ()=>{
  return <RankIconBase svgSrc="/SVG/knight.svg" borderColorHex="border-[#acb2b5]"/>
}

export const GoldIcon = ()=>{
  return <RankIconBase svgSrc="/SVG/bishop.svg" borderColorHex="border-[#fae093]"/>
}

export const DiamondIcon = ()=>{
  return <RankIconBase svgSrc="/SVG/rook.svg" borderColorHex="border-[#a3c2ec]"/>
}

export const MasterIcon = ()=>{
  return <RankIconBase svgSrc="/SVG/queen.svg" borderColorHex="border-[#ab73ce]"/>
}

export const RankIconBase:React.FC<{svgSrc:string, borderColorHex:string}> = ({svgSrc, borderColorHex})=>{
  return(
    <div className={`w-full h-full rounded-sm bg-slate-900 p-4 ${borderColorHex} border-4`}>
      <div className="h-full relative">
        <Image src={svgSrc} 
          alt={"rank icon"} 
          fill style={{objectFit:"contain"}}
        />
      </div>
    </div>
  )
}