import { useState } from "react"

export const SubmitButton:React.FC<{isDisable:boolean}> = ({isDisable})=>{
  const [isPending, setPending] = useState<boolean>(false)
  return(
    <button 
      type="submit" 
      form="imagePostForm"
      formEncType="multipart/form-data"
      disabled={isDisable}
      onClick={()=>{setPending(true)}}
      className={`p-4 rounded-md bg-green-500 text-gray-100 ${isPending && "pointer-events-none"}`}
    >
      { isPending ? "送信中…" : "提出する"}
    </button>
  )
}