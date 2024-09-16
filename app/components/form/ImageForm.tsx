"use client"

import { ChangeEvent, useState } from "react";
import { PreviewImage } from "./PreviewImage";

export default function ImageForm() {
  const [previewFile, setPreview] = useState<File>()

  return (
    <form action="" method="post">
      {previewFile ?<PreviewImage previewFile={previewFile}/>
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
              accept=".png, .jpg, .jpeg" //ツールを使って指定外のファイルも入力可能なためバリデーション必須
              className="opacity-0" // デフォルト表記のスタイリングが難しいので代わりにlabelを用いた表示用要素を使用
              onChange={showPreview}
            />
        <button type="submit" className="block">送信</button>
      </div>
    </form>
  )

  function showPreview(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return;

    // ファイル選択画面でキャンセルを押した場合はlengthが0になる
    if(e.target.files.length !== 0){
      const submitedFile = e.target.files[0]
      setPreview(submitedFile)
    }
  }

}

