import { cookies } from "next/headers"
import { LoginButton } from "@/app/features/userAuth/login/components/loginButton"
import { LogoutButton } from "@/app/features/userAuth/logout/components/logoutButton"
import Link from "next/link"

export const Header = async ()=>{
  const isLogin = haveSessionID()
  return(
    <nav>
      <Link href={"/"} className="mx-2">ホーム</Link>
      {isLogin ? <LogoutButton/> : <LoginButton/>}
    </nav>
  )
}

export function haveSessionID(){
  const cookieStore = cookies()
  return cookieStore.has("PHPSESSID")
}