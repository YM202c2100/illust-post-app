import { cookies } from "next/headers"
import { LoginButton } from "@/app/features/userAuth/login/components/loginButton"
import { LogoutButton } from "@/app/features/userAuth/logout/components/logoutButton"
import Link from "next/link"
import { PHP_ROOT_PATH } from "@/app/api/config"
import { getHeaderWithSessId } from "@/app/api/cookieHeader"

export const Header = async ()=>{
  const reqHeaders = getHeaderWithSessId()
  const res = await fetch(PHP_ROOT_PATH+"getUser.php",{
    credentials:"include",
    headers:reqHeaders
  })
  const user = await res.json()

  console.log(user);
  
  return(
    <nav>
      <Link href={"/"} className="mx-2">ホーム</Link>
      {(user.length === 0) ? <LoginButton/> : <LogoutButton/>}
      {user.user_name &&
        <div>
          {user.user_name}でログイン中
        </div>
      }
    </nav>
  )
}