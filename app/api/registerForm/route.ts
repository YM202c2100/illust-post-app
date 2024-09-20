import { NextResponse } from "next/server"
import { PHP_ROOT_PATH } from "../config"

export async function POST(req:Request){
  const bodyData = await req.formData()
  const res = await fetch(`${PHP_ROOT_PATH}/index/register.php`,{
    method:"post",
    body:bodyData
  })

  const resJson = await res.json()

  return NextResponse.json(resJson)
}