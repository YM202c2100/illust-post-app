import { Dispatch, RefObject, useEffect, useRef } from "react"
import { SelectedSide, SelectSideAction } from "./imagesToJudge"
import { ImageToJudge } from "@/app/models/pages/judge.model"
import { convertToValidSrc } from "@/app/libs/helper"
import Image from "next/image"


export type ImageUnderJudgingProps = {
  images:ImageToJudge[]
  thisSide:NonNullable<SelectedSide>
  selectedSide:SelectedSide
  dispatchSelectedSide:Dispatch<SelectSideAction>,
  containerRef:RefObject<HTMLDivElement>
}

export const ImageUnderJudging:React.FC<ImageUnderJudgingProps> = ({images, thisSide, selectedSide, dispatchSelectedSide, containerRef})=>{
  const idx = (thisSide === "left") ? 0:1
  const imgSrc = convertToValidSrc(images[idx].file_name)
  const observeTargetRef = useRef(null)

  useEffect(()=>{
    if(!observeTargetRef.current || !containerRef.current) return;

    if(window.matchMedia("(max-width:768px)").matches){
      const observer = new IntersectionObserver(()=>{
        dispatchSelectedSide({type:thisSide})
      },{root:containerRef.current, threshold:1})
  
      if(observeTargetRef.current){
        observer.observe(observeTargetRef.current)
      }
  
      return ()=>{
        observer.disconnect()
      }
    }
  },[])

  return(
    <div 
      className={`snap-center 
        flex-shrink-0 ${(selectedSide===thisSide) ? "md:flex-grow-1.2":"md:flex-grow"}
        w-full md:w-auto 
        md:flex flex-col justify-center
        transition-[flex-grow] ease-in cursor-pointer`}
      onClick={()=>{dispatchSelectedSide({type:thisSide})}}
    >
      <div className="w-full aspect-square bg-zinc-100 md:rounded-2xl p-4 shadow-none md:shadow-lg md:shadow-slate-400">
        <div 
          ref={observeTargetRef}
          className="relative w-full h-full rounded-xl">
          <Image src={imgSrc} 
            alt={"image to judge"}
            fill style={{objectFit:"contain"}}
            sizes="(max-width 768px) 90vw, 50vw"
          />
        </div>
      </div>
    </div>
  )
}