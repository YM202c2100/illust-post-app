"use client"

import { ImageWithRP } from "@/app/models/pages/result.model"
import Image from "next/image"
import { useState } from "react"

export const OthersImage:React.FC<{
  image:ImageWithRP
}> = ({image})=>{
  const [isEnlarged, setIsEnlarged] = useState<boolean>(false)
  return(
    <div>
      <div className="flex justify-between mx-2">
        <p>{image.user_name}</p>
        <p>{image.rank_points} RP</p>
      </div>

      <div className="w-full aspect-square relative rounded-xl overflow-hidden">
        <Image src={`/postedImages/${image.file_name}`} 
          alt="others submission" 
          fill style={{objectFit:"cover"}}
          sizes="(max-width: 768px) 90vw, 40vw"
          className="cursor-zoom-in"
          onClick={()=>{setIsEnlarged(true)}}
        />
      </div>

      {isEnlarged && 
        <div 
          className="fixed inset-0 z-10 bg-enlarged-view flex justify-center items-center cursor-zoom-out"
          onClick={()=>{setIsEnlarged(false)}}
        >
          <div className="w-[98%] h-[98%] relative">
            <Image src={`/postedImages/${image.file_name}`} 
              alt="others submission" 
              fill style={{objectFit:"contain"}}
              sizes="100vw"
            />
          </div>
        </div>
      }
    </div>
  )
}