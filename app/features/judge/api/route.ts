import { PHP_ROOT_PATH } from "@/app/api/config"
import { getHeaderWithSessId } from "@/app/api/cookieHeader"

export async function POST(req:Request) {
  const bodyObject = await req.json()

  const res = await fetch(PHP_ROOT_PATH+"judge.php",{
    method:"post",
    body:JSON.stringify(bodyObject),
    headers:{
      "Content-Type":"application/json"
    }
  })

  const resBody = await res.json()

  return new Response(resBody, {status:res.status})
}

async function GET() {
  const reqHeaders = getHeaderWithSessId()

  const res = await fetch(PHP_ROOT_PATH+"judge.php",{
    method: "get",
    credentials: "include",
    headers: reqHeaders
  })

  return res;
}

export async function judgeApiGetRequest() {
  return GET()
}