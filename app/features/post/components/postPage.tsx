"use client"

import Image from "next/image"
import { ImageForm } from "./ImageForm"
import { PostButton } from "./postButton"
import { useState } from "react"

export const PostPage:React.FC<{imgSrc: string|null}> = ({imgSrc})=>{
  const [isDisable, setButtonDisable] = useState<boolean>(true)
  return(
    <div className="flex space-x-10">
      {imgSrc && 
        <div>
          <p>提出済みのイラスト</p>
          <div className="w-[300px] h-[300px] relative">
            <Image src={imgSrc} alt="submitted Image" fill style={{objectFit:"contain"}}/>
          </div>
        </div>
      }
      <ImageForm setButtonDisable={setButtonDisable}/>
      <PostButton isDisable={isDisable}/>
    </div>
  )
}