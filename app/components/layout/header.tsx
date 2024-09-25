"use client"

import { LoginButton } from "@/app/features/userAuth/login/components/loginButton"
import { LogoutButton } from "@/app/features/userAuth/logout/components/logoutButton"
import { useEffect, useState } from "react"

export const Header = ()=>{
  const [isLogin, setIsLogin] = useState<boolean>()
  
  useEffect(()=>{
    async function setLoginState(){
      const res = await fetch("features/userAuth/login/api")
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