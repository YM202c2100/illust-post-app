import "server-only"
import { cookies } from "next/headers"

export function getHeaderWithSessId(){
  const headers = new Headers()

  const sessionId = cookies().get("PHPSESSID")
  
  if(sessionId){
    headers.append("Cookie", `${sessionId.name}=${sessionId.value}`)
  }

  return headers
}