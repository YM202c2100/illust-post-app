import { PHP_ROOT_PATH } from "./config";
import { getHeaderWithSessId } from "./cookieHeader";

export async function GET(pageName:string) {
  const reqHeaders = getHeaderWithSessId()

  const res = await fetch(PHP_ROOT_PATH+pageName+".php",{
    method: "get",
    credentials: "include",
    headers: reqHeaders
  })

  return res;
}