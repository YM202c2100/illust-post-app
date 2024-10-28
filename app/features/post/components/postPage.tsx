"use client"

import Image from "next/image"
import { ImageForm } from "./ImageForm"
import { PostButton } from "./postButton"
import { useState } from "react"

export const PostPage:React.FC<{imgSrc: string|null}> = ({imgSrc})=>{
  const [isDisable, setButtonDisable] = useState<boolean>(true)
  const [isVisiblePreviousImg, togglePreviousImg] = useState<boolean>(false)

  if(!imgSrc){
    return(
      <div className="container mx-auto bg-gray-300">
        <div className="w-[90%] md:w-[90vh] aspect-square mx-auto bg-blue-300">
          <ImageForm setButtonDisable={setButtonDisable}/>
        </div>
        
        <div className="text-center">
          <PostButton isDisable={isDisable}/>
        </div>
      </div>
    )
  }else{
    return(
      <div className="container mx-auto ">
        <button 
          onClick={()=>{togglePreviousImg(!isVisiblePreviousImg)}}
          className="md:hidden"
        >
          現在の応募作品を見る
        </button>

        <div className="flex flex-col md:flex-row justify-center items-center bg-gray-300 relative">
          <div 
            className={`${isVisiblePreviousImg ? "opacity-100" : "opacity-0"} md:opacity-100 transition-opacity duration-150
            absolute md:relative 
            w-[90%] md:w-[40%] aspect-square 
            bg-red-300`}
          >
            <Image src={imgSrc} alt="submitted Illust" fill style={{objectFit:"contain"}}/>
          </div>

          <div className="hidden md:block flex-grow text-center">
            →
          </div>

          <div className="w-[90%] md:w-[40%] aspect-square bg-blue-300">
            <ImageForm setButtonDisable={setButtonDisable}/>
          </div>
        </div>

        <div className="text-center">
          <PostButton isDisable={isDisable}/>
        </div>
      </div>
    )
  }
}