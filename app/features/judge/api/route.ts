import { PHP_ROOT_PATH } from "@/app/api/config"
import { getHeaderWithSessId } from "@/app/api/cookieHeader"

export async function POST(req:Request) {
  const bodyObject = await req.json()

  const reqHeaders = getHeaderWithSessId()
  reqHeaders.append("Content-Type", "application/json")

  const res = await fetch(PHP_ROOT_PATH+"judge.php",{
    method:"post",
    body:JSON.stringify(bodyObject),
    credentials:"include",
    headers: reqHeaders
  })

  const resBody = await res.json()

  return new Response(JSON.stringify(resBody), {status:res.status})
}