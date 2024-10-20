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
      <div className="flex justify-between">
        <Link href={"/"} className="mx-2">ホームへ</Link>
        { user ? <LogoutButton/>
              : <div>
                  <LoginButton/>
                  <Link href={"register"} className="ml-2">新規登録</Link>
                </div>
        }
      </div>

      {user &&
        <div className="text-end">
          {user.user_name}でログイン中
        </div>
      }
    </nav>
  )
}