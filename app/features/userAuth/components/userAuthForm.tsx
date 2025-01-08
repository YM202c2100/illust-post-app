"use client"

import { ErrorMessage } from "@/app/models/pages/common.model"
import { usePathname } from "next/navigation"
import { FormEvent } from "react"

export const UserAuthForm:React.FC = ()=>{
  const currentPath = usePathname()
  const isRegisterPage = (currentPath === "/register")

  return(
    <div 
      className="w-[80%] max-w-[600px] mx-auto
        border-2 border-black rounded-xl p-5 text-lg
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <form method="post" 
        onSubmit={submitHandler}
        className="space-y-4"
      >
        <div>
          <p>ID</p>
          <AuthFormInput type="text" name="id"/>
        </div>

        <div>
          <p>パスワード</p>
          <AuthFormInput type="password" name="pwd"/>
        </div>

        {isRegisterPage &&
          <div>
            <p>ユーザーネーム</p>
            <AuthFormInput type="text" name="userName"/>
          </div>
        }

        <button type="submit" 
          className="border border-black rounded-md px-1"
        >
          {isRegisterPage ? "新規登録":"ログイン"}
        </button>
      </form>
    </div>
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

const AuthFormInput:React.FC<{type:"text"|"password", name:string}> = ({type, name})=>{
  return(
    <input type={type} name={name} className="border border-black w-full rounded-md"/>
  )
}