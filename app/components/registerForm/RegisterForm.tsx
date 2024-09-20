"use client"

export const RegisterForm:React.FC = ()=>{
  return(
    <form method="post">
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
}