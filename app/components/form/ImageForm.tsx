"use client"

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { PreviewImage } from "./PreviewImage";

export default function ImageForm() {
  const [previewFile, setPreview] = useState<File>()
  const submitRef = useRef<HTMLButtonElement>(null);

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

        <button type="submit" ref={submitRef} className="block" disabled>送信</button>
      </div>
    </form>
  )

  async function submitHandler(e:FormEvent<HTMLFormElement>){
    enableSending(false)

    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const res = await fetch("/api/form", {
      method:"post",
      body:formData
    })

    if(res.ok){
      const resJson = await res.json();
      console.log(resJson.message);
     
      enableSending(true)
    }

  }

  function togglePreview(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return;

    // ファイル選択画面でキャンセルやescを押した場合はlengthが0になる
    if(e.target.files.length === 0){
      enableSending(false)
      setPreview(undefined)
    }else{
      enableSending(true)
      const submitedFile = e.target.files[0]
      setPreview(submitedFile)
    }
  }

  function enableSending(enable:boolean):void{
    if(!submitRef.current) return;

    submitRef.current.disabled = !enable
  }

}

