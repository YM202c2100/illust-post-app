import { PHP_ROOT_PATH } from "@/app/api/config";
import { sharedCookieRequest } from "@/app/(userAuth)/api/sharedCookieRequest";

export async function POST(req:Request) {
  return sharedCookieRequest(req, PHP_ROOT_PATH+"/index/register.php")
}