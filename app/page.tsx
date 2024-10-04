import Link from "next/link";
import Image from "next/image";
import { GET } from "./api/getRequest";
import { convertToValidSrc } from "./libs/helper";
import { HomeResData } from "./models/home.model";
import { ContestInfo } from "./features/home/components/ContestInfo";

export default async function Home(){
  const res = await GET("home")
  if(!res.ok){
    return <div>エラーが発生しました。時間をおいて再度お試しください。</div>
  }

  const data:HomeResData = await res.json()
  
  if(!data.isLogin){
    return <div>ログインしてください</div>
  }
  
  const myIllustSrc = data.submittedFileName ?
                        convertToValidSrc(data.submittedFileName)
                        :null
  return(
    <div>
      <div>
        { myIllustSrc ? 
            <Image src={myIllustSrc} alt="submitted Illust" width={500} height={500}/>:
            <div>コンテストに画像を投稿してみよう</div>
        }
      </div>

      <ContestInfo contest={data.contest}/>
      <div className="flex flex-col space-y-2 items-start">
        <TempLink pageName="post"/>
        <TempLink pageName="register"/>
        <TempLink pageName="login"/>
        <TempLink pageName="judge"/>
        <TempLink pageName="ranking"/>
      </div>
    </div>
  )
}

const TempLink:React.FC<{pageName:string}> = ({pageName})=>{
  return(
    <Link href={pageName} className="underline underline-offset-2">{pageName}</Link>
  )
}