"use client"

import { ChangeEvent, useState } from "react";

export default function Home() {
  const [previewImgUrl, setPreview] = useState<string>()

  return (
    <form action="" method="post">
      {previewImgUrl ?
        <img src={previewImgUrl} className="w-[300px] h-auto" /> 
        :<div>preview</div>
      }
      <div>
        <label 
          htmlFor="image_uploads" 
          className="border border-black cursor-pointer"
        >
          アップロードする画像を選択してください
        </label>
            <input 
              type="file" 
              name="image_uploads" 
              id="image_uploads" 
              accept=".png, .jpg, .jpeg" 
              className="opacity-0"
              onChange={showPreview}
            />
        <button type="submit" className="block">送信</button>
      </div>
    </form>
  )

  function showPreview(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return;

    if(e.target.files.length !== 0){
      const submitedFile = e.target.files[0]
      const submitedFileUrl = URL.createObjectURL(submitedFile)
      setPreview(submitedFileUrl)
    }
  }

}
