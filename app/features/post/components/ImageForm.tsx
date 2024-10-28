"use client"

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { PreviewImage } from "./PreviewImage";
import { submitHandler } from "../api/handler";

type ImageFormProps = {
  setButtonDisable: Dispatch<SetStateAction<boolean>>

}

export const ImageForm:React.FC<ImageFormProps> = ({setButtonDisable})=>{
  const [previewFile, setPreview] = useState<File>()

  return (
    <div className="h-full relative">
      {previewFile && 
        <div className="w-full h-full absolute">
          <PreviewImage previewFile={previewFile}/>
        </div>
      }

      <label htmlFor="image_uploads" className="h-full flex justify-center items-center cursor-pointer text-center">
        応募する作品を選択
        <form id="imagePostForm" onSubmit={submitHandler} method="post" className="absolute pointer-events-none">
          <input 
            type="file" 
            name="image_uploads" 
            id="image_uploads" 
            accept=".png, .jpg, .jpeg" //ツールを使って指定外のファイルも入力可能なためバリデーション必須
            className="opacity-0" // デフォルト表記のスタイリングが難しいので代わりにlabelを用いた表示用要素を使用
            onChange={changeHandler}
          />
        </form>
      </label>
    </div>
  )

  function changeHandler(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return;

    // ファイル選択画面でキャンセルやescを押した場合はlengthが0になる
    if(e.target.files.length === 0){
      setPreview(undefined)
      setButtonDisable(true)
    }else{
      const submitedFile = e.target.files[0]
      setPreview(submitedFile)
      setButtonDisable(false)
    }
  }
}

