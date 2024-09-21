"use client"

import { FormEvent } from "react"

export const RegisterForm:React.FC = ()=>{
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

      <div>
        <p>ユーザーネーム</p>
        <input type="text" name="userName" className="border border-black"/>
      </div>

      <button type="submit" className="border border-black">登録</button>
    </form>
  )

  async function submitHandler(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    try {
      const formData = new FormData(e.currentTarget)
      const res =await fetch("register/api", {
        method:"post",
        body:formData,
        credentials:"include"
      })

      if(!res.ok){
        console.error(`submitHandler: not ok`);
      }

      const resJson = await res.json()
      console.log(resJson);

    } catch (error) {
      console.error(`submitHandler:${error}`);
    }
  }
}