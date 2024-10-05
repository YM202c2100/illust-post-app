import { redirect } from "next/navigation";
import { GET } from "@/app/api/getRequest";
import { PostDataGET } from "@/app/models/post.model";
import { convertToValidSrc } from "@/app/libs/helper";
import ImageForm from "@/app/features/post/components/ImageForm";

export default async function Post(){
  const res = await GET("post")
  if(!res.ok){
    return <div>エラーが発生しました。時間をおいて再度お試しください。</div>
  }

  const data:PostDataGET = await res.json()
  
  if(!data.isLogin){
    redirect("login")
  }

  const submittedImgSrc = data.submittedImage ? 
                            convertToValidSrc(data.submittedImage)
                            :null

  return(
    <div>
      {submittedImgSrc && <img src={submittedImgSrc} width={300}/>}
      <ImageForm/>
    </div>
  )
}