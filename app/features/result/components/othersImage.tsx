"use client"

import { ImageWithRP } from "@/app/models/pages/result.model"
import Image from "next/image"
import { useState } from "react"

export const OthersImage:React.FC<{
  image:ImageWithRP
}> = ({image})=>{
  const [isEnlarged, setIsEnlarged] = useState<boolean>(false)
  return(<>
    {isEnlarged && 
      <div className="fixed inset-0 z-10 bg-enlarged-view flex justify-center items-center">
        <button 
          className="absolute z-10 top-3 right-3 text-white text-3xl"
          onClick={()=>{setIsEnlarged(false)}}
        >
          戻る
        </button>
        <div className="w-[98%] h-[98%] relative">
          <Image src={`/postedImages/${image.file_name}`} 
            alt="others submission" 
            fill style={{objectFit:"contain"}}
            sizes="100vw"
          />
        </div>
      </div>
    }
    <div className="flex justify-between mx-2">
      <p>{image.user_name}</p>
      <p>{image.rank_points} RP</p>
    </div>
    <div className="w-full aspect-square relative rounded-xl overflow-hidden">
      <Image src={`/postedImages/${image.file_name}`} 
        alt="others submission" 
        fill style={{objectFit:"cover"}}
        sizes="(max-width: 768px) 90vw, 40vw"
        className="cursor-pointer"
        onClick={()=>{setIsEnlarged(true)}}
      />
    </div>
  </>)
}