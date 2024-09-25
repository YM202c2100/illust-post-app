import { PHP_ROOT_PATH } from "@/app/api/config";
import { sharedCookieRequest } from "../../userAuth/api/sharedCookieRequest";

export async function POST(req:Request){
  return await sharedCookieRequest(req, PHP_ROOT_PATH+"/index/imageForm.php")
}