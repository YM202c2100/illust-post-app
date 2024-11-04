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
      className={`rounded-md text-gray-100 bg-green-500 ${(isPending||isDisable) && "pointer-events-none bg-gray-400"}`}
    >
      { isPending ? "送信中…" : "提出する"}
    </button>
  )
}