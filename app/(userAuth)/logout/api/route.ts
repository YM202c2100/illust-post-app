import { cookies } from "next/headers";

export async function GET() {
  cookies().delete('PHPSESSID')
  return new Response(JSON.stringify({status:"ok", body:"ログアウトしました"}))
}