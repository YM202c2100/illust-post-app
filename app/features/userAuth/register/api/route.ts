import { PHP_ROOT_PATH } from "@/app/api/config";
import { sharedCookieFormRequest } from "@/app/api/sharedCookieFormRequest";

export async function POST(req:Request) {
  return await sharedCookieFormRequest(req, PHP_ROOT_PATH+"/index/register.php")
}