import { NextResponse } from "next/server";
import { PHP_ROOT_PATH } from "../config";

export async function POST(req:Request){
  const formData = await req.formData();

  const res = await fetch(`${PHP_ROOT_PATH}/imageForm/index.php`, {
    method:"post",
    body:formData
  })

  if(!res.ok){
    console.error("response is not ok");
    return NextResponse.json({ message: 'response is not ok' }, { status: 500 });
  }

  return NextResponse.json({ message: 'image is submited successly' }, { status: 200 });
}