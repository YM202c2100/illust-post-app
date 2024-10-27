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
    <form id="imagePostForm" onSubmit={submitHandler} method="post">
      {previewFile && 
        <div>
          <p>変更後のイラスト</p>
          <PreviewImage previewFile={previewFile}/>
        </div>
      }
      <div>
        <label 
          htmlFor="image_uploads" 
          className="border border-black cursor-pointer"
        >
            {previewFile ? "別のイラストを選ぶ":"アップロードする画像を選択してください"}
        </label>

        <input 
          type="file" 
          name="image_uploads" 
          id="image_uploads" 
          accept=".png, .jpg, .jpeg" //ツールを使って指定外のファイルも入力可能なためバリデーション必須
          className="opacity-0" // デフォルト表記のスタイリングが難しいので代わりにlabelを用いた表示用要素を使用
          onChange={changeHandler}
        />
      </div>
    </form>
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

