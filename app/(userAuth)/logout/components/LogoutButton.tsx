"use client"

export function LogoutButton(){
  return(
    <button onClick={logoutHandler}>ログアウト</button>
  )

  async function logoutHandler(){
    const res = await fetch("/logout/api")
    const resData = await res.json()
    console.log(resData);
    if(resData.status === "ok"){
      window.location.reload()
    }
  }
}