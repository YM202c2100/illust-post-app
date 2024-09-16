import Image from "next/image"
import { useEffect, useState } from "react"

// 渡されたファイルのプレビュー画像を表示する
export const PreviewImage:React.FC<{previewFile:File}> = ({previewFile})=>{
  // useEffect内でcreateObjectURLを実行しなければならない
  // (strictModeのせいでuseEffectのcleanUpが呼ばれてURLが使えなくなる)
  // 上記の理由から、jsx内で参照できるように、生成したURLをstateに格納
  const [previewURL, setURL] = useState<string>()
  
  useEffect(()=>{
    const previewURL = URL.createObjectURL(previewFile)
    setURL(previewURL)

    return ()=>{
      // createObjectURLで確保したメモリの開放
      URL.revokeObjectURL(previewURL)
    }
  },[previewFile])

  return(<>
    {/* widthやheightは一時的に設定した仮の数値 */}
    {previewURL && 
      <Image src={previewURL} alt={previewFile.name} width={300} height={300}/>
    }
  </>)
}