"use client"

import { LoginButton } from "@/app/(userAuth)/components/loginButton"
import { LogoutButton } from "@/app/(userAuth)/logout/components/LogoutButton"
import { useEffect, useState } from "react"

export const Header = ()=>{
  const [isLogin, setIsLogin] = useState<boolean>()
  
  useEffect(()=>{
    async function setLoginState(){
      const res = await fetch("login/api")
      const islogin = await res.json().then(data => data.isLogin)
      setIsLogin(islogin)
    }

    setLoginState()
  },[])

  return(
    <nav>
      {isLogin ? <LogoutButton/> : <LoginButton/>}
    </nav>
  )
}