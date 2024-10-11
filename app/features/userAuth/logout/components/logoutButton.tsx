"use client"

export function LogoutButton(){
  return(
    <button onClick={logoutHandler}>ログアウト</button>
  )

  async function logoutHandler(){
    const res = await fetch("features/userAuth/logout/api")
    if(res.ok){
      window.location.reload()
    }else{
      const resData = await res.json()
      console.error(resData);
    }
  }
}