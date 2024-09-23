import { PHP_ROOT_PATH } from "@/app/api/config";
import { sharedCookieRequest } from "@/app/(userAuth)/api/sharedCookieRequest";

export async function POST(req:Request) {
  return await sharedCookieRequest(req, PHP_ROOT_PATH+"/index/login.php")
}