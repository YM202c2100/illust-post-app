"use client"

import Image from "next/image"
import ImageForm from "./ImageForm"
import { PostButton } from "./postButton"

export const PostPage:React.FC<{imgSrc: string|null}> = ({imgSrc})=>{
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
      <ImageForm/>
      <PostButton/>
    </div>
  )
}