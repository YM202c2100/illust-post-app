import { PHP_ROOT_PATH } from "@/app/api/config"

export async function POST(req:Request) {
  const bodyObject = await req.json()

  const res = await fetch(PHP_ROOT_PATH+"judge.php",{
    method:"post",
    body:JSON.stringify(bodyObject),
    headers:{
      "Content-Type":"application/json"
    }
  })

  return new Response(null, {status:res.status})
}