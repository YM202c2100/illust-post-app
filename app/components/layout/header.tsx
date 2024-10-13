import { LoginButton } from "@/app/features/userAuth/login/components/loginButton"
import { LogoutButton } from "@/app/features/userAuth/logout/components/logoutButton"
import Link from "next/link"
import { GET } from "@/app/api/getRequest"

export const Header = async ()=>{
  const res = await GET("getUser")
  const data = await res.json()
  const user = data.user

  return(
    <nav>
      <Link href={"/"} className="mx-2">ホーム</Link>
      { user ? <LoginButton/> : <LogoutButton/>}
      {user &&
        <div>
          {user.user_name}でログイン中
        </div>
      }
    </nav>
  )
}