"use client"

import Image from "next/image"
import { ImageForm } from "./ImageForm"
import { SubmitButton } from "./submitButton"
import { useState } from "react"
import { FileSelectButton } from "./fileSelectButton"

export const PostPage:React.FC<{imgSrc: string|null}> = ({imgSrc})=>{
  const [isDisable, setButtonDisable] = useState<boolean>(true)
  const [isVisiblePreviousImg, togglePreviousImg] = useState<boolean>(false)

  return(
    <div className="container mx-auto">
      {imgSrc ? (<>
        <button 
          onClick={()=>{togglePreviousImg(!isVisiblePreviousImg)}}
          className="md:hidden"
        >
          現在の応募作品を見る
        </button>

        <div className="flex flex-col md:flex-row items-center">
          <div 
            className={`${isVisiblePreviousImg ? "opacity-100" : "opacity-0 pointer-events-none"} md:opacity-100 transition-opacity duration-150
            absolute z-10 md:relative 
            w-[90%] md:w-[40%] aspect-square
            bg-white`}
          >
            <Image src={imgSrc} 
              alt="submitted Illust" 
              fill style={{objectFit:"contain"}} 
              sizes="(max-width: 768px) 90vw, 40vw"
            />
          </div>

          <div className="hidden md:block flex-grow">
            <div className="w-[40%] aspect-square mx-auto relative">
              <Image src={"/SVG/rightArrow.svg"} 
                alt="right arrow" 
                fill style={{objectFit:"cover"}}
                sizes="20vw"
              />
            </div>
          </div>

          <div className="w-[90%] md:w-[40%] aspect-square">
            <ImageForm setButtonDisable={setButtonDisable}/>
          </div>
        </div>
      </>):(
        <div className="w-[90%] md:w-[90vh] aspect-square mx-auto">
          <ImageForm setButtonDisable={setButtonDisable}/>
        </div>
      )}

      <div className="mt-8 text-center">
        <div className="inline-grid grid-cols-2 gap-10">
            <FileSelectButton/>
            <SubmitButton isDisable={isDisable}/>
        </div>
      </div>
    </div>
  )
}