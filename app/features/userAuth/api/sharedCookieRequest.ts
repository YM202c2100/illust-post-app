export async function sharedCookieRequest(req: Request, endpoint:string){
  const formData = await req.formData()
  const cookie = req.headers.get("cookie")

  const reqHeaders = new Headers()
  if(cookie){
    reqHeaders.append("Cookie", cookie)
  }

  const res = await fetch(endpoint,{
    method:"post",
    body: formData,
    credentials: "include",
    headers: reqHeaders
  })

  const data = await res.json()
  const setcookie = res.headers.get("Set-Cookie")

  const resHeaders = new Headers()
  if(setcookie){
    resHeaders.set("Set-Cookie", setcookie)
  }

  return new Response(
    JSON.stringify(data),
    {
      headers:resHeaders
    }
  )
}