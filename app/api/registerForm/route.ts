import { NextResponse } from "next/server"

export async function POST(req:Request){
  const bodyData = await req.formData()
  const res = await fetch("http://localhost:8888/illust-post-app/PHP/registerForm/index.php",{
    method:"post",
    body:bodyData
  })

  const resJson = await res.json()

  return NextResponse.json(resJson)
}