"use client"

import { ErrorMessage } from "@/app/models/pages/common.model"
import { usePathname } from "next/navigation"
import { FormEvent } from "react"

export const UserAuthForm:React.FC = ()=>{
  const currentPath = usePathname()
  const isRegisterPage = (currentPath === "/register")

  return(
    <form onSubmit={submitHandler} method="post">
      <div>
        <p>ID</p>
        <input type="text" name="id" className="border border-black"/>
      </div>

      <div>
        <p>パスワード</p>
        <input type="password" name="pwd" className="border border-black"/>
      </div>

      {isRegisterPage &&
        <div>
          <p>ユーザーネーム</p>
          <input type="text" name="userName" className="border border-black"/>
        </div>
      }

      <button type="submit" className="border border-black">登録</button>
    </form>
  )

  async function submitHandler(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    const endpoit = isRegisterPage ? "features/userAuth/register/api" : "features/userAuth/login/api"
    try {
      const formData = new FormData(e.currentTarget)
      const res = await fetch(endpoit, {
        method:"post",
        body:formData,
        credentials:"include"
      })

      const data:Partial<ErrorMessage> = await res.json()
      if(!data.errMsg && res.ok){
        window.location.href = "/"
      }else{
        alert(data.errMsg);
      }

    } catch (error) {
      console.error(`submitHandler:${error}`);
    }
  }
}