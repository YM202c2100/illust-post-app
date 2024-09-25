import { PHP_ROOT_PATH } from "@/app/api/config";
import { sharedCookieFormRequest } from "@/app/api/sharedCookieFormRequest";
import { cookies } from "next/headers";

export async function POST(req:Request) {
  return await sharedCookieFormRequest(req, PHP_ROOT_PATH+"/index/login.php")
}

export function GET() {
  const isLogin = haveSessionID()
  return new Response(JSON.stringify({isLogin:isLogin}))
}

function haveSessionID(){
  const cookieStore = cookies()
  return cookieStore.has("PHPSESSID")
}