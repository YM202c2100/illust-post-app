import { PHP_ROOT_PATH } from "@/app/api/config";
import { sharedCookieRequest } from "@/app/features/userAuth/api/sharedCookieRequest";
import { cookies } from "next/headers";

export async function POST(req:Request) {
  return await sharedCookieRequest(req, PHP_ROOT_PATH+"/index/login.php")
}

export function GET() {
  const isLogin = haveSessionID()
  return new Response(JSON.stringify({isLogin:isLogin}))
}

function haveSessionID(){
  const cookieStore = cookies()
  return cookieStore.has("PHPSESSID")
}