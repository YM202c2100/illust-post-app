import { NextResponse } from "next/server"
import { PHP_ROOT_PATH } from "@/app/api/config"

export async function POST(req:Request){
  const bodyData = await req.formData()
  const cookie = req.headers.get("cookie")
  if(!cookie) return;

  const res = await fetch(`${PHP_ROOT_PATH}/index/register.php`,{
    method : "post",
    body : bodyData,
    credentials : "include",
    headers : {
      "Cookie":cookie
    }
  })

  const resJson = await res.json()

  return NextResponse.json(resJson)
}