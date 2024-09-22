import { PHP_ROOT_PATH } from "@/app/api/config"

export async function POST(req:Request){
  const bodyData = await req.formData()
  const cookie = req.headers.get("cookie")
  
  const reqHeaders = new Headers()
  if(cookie){
    reqHeaders.append('Cookie', cookie)
  }

  const res = await fetch(`${PHP_ROOT_PATH}/index/register.php`,{
    method : "post",
    body : bodyData,
    credentials : "include",
    headers : reqHeaders
  })

  const resHeaders = new Headers()
  const setCookie = res.headers.get("set-cookie")
  if(setCookie){
    resHeaders.set("Set-Cookie", setCookie)
  }
  const data = await res.json()

  return new Response(
    JSON.stringify(data),
    {
      headers:resHeaders
    }
  )
}