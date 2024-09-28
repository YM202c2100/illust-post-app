"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import { PreviewImage } from "./PreviewImage";

export default function ImageForm() {
  const [previewFile, setPreview] = useState<File>()
  const [pending, setPending] = useState<boolean>(false);

  return (
    <form onSubmit={submitHandler} method="post">
      {previewFile ?<PreviewImage previewFile={previewFile}/>
                   :<div>preview</div>
      }
      <div>
        <label 
          htmlFor="image_uploads" 
          className="border border-black cursor-pointer"
        >
            {previewFile ? "変更する":"アップロードする画像を選択してください"}
        </label>

        <input 
          type="file" 
          name="image_uploads" 
          id="image_uploads" 
          accept=".png, .jpg, .jpeg" //ツールを使って指定外のファイルも入力可能なためバリデーション必須
          className="opacity-0" // デフォルト表記のスタイリングが難しいので代わりにlabelを用いた表示用要素を使用
          onChange={togglePreview}
        />

        <button type="submit" className="block" disabled={!previewFile || pending}>
          {(pending) ? "送信中…":"送信する"}
        </button>
      </div>
    </form>
  )

  async function submitHandler(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    setPending(true)

    const formData = new FormData(e.currentTarget)
    const res = await fetch("features/post/api", {
      method:"post",
      body:formData,
      credentials:"include"
    })

    if(res.ok){
      const resJson = await res.json();
      console.log(resJson);
     
      setPending(false)
    }

  }

  function togglePreview(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return;

    // ファイル選択画面でキャンセルやescを押した場合はlengthが0になる
    if(e.target.files.length === 0){
      setPreview(undefined)
    }else{
      const submitedFile = e.target.files[0]
      setPreview(submitedFile)
    }
  }
}
