import { PHP_ROOT_PATH } from "@/app/api/config"
import { cookies } from "next/headers"

export default async function Judge(){
  const sessionId = cookies().get("PHPSESSID")
  const reqHeaders = new Headers()
  if(sessionId){
    reqHeaders.append("Cookie", "PHPSESSID="+sessionId.value)
  }

  const res = await fetch(PHP_ROOT_PATH+"/index/judge.php",{
    method: "get",
    credentials: "include",
    headers: reqHeaders
  })

  if(!res.ok){
    return(
      <div>通信失敗</div>
    )
  }

  const data = await res.json()
  
  if(data.status === "ok"){
    return(
      <div>
        <div>
          画像1:{data.body[0].file_name}
        </div>
  
        <div>
          画像2:{data.body[1].file_name}
        </div>
      </div>
    )
  }else{
    return(
      <div>{data.body}</div>
    )
  }
}