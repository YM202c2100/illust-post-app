import { Dispatch, FormEvent, SetStateAction } from "react";

export async function submitHandler(e:FormEvent<HTMLFormElement>, setPending:Dispatch<SetStateAction<boolean>>){
  e.preventDefault()

  setPending(true)

  const formData = new FormData(e.currentTarget)
  const res = await fetch("features/post/api", {
    method:"post",
    body:formData,
    credentials:"include"
  })

  if(res.ok){
    window.location.href = "/"
  }else{
    const data = await res.json()
    console.error(data.errMsg)
  }
}