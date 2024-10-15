import Link from "next/link";
import { GET } from "./api/getRequest";
import { convertToValidSrc } from "./libs/helper";
import { HomeDataGET } from "./models/home.model";
import { MyIllust } from "./features/home/components/myIllust";

export default async function Home(){
  const res = await GET("home")
  if(!res.ok){
    return <div>エラーが発生しました。時間をおいて再度お試しください。</div>
  }

  const data:HomeDataGET = await res.json()
  
  if(!data.isLogin){
    return <div>ログインしてください</div>
  }
  
  const myIllustSrc = data.submittedFileName ?
                        convertToValidSrc(data.submittedFileName)
                        :null

  return(<>
    <div className="flex flex-col xl:flex-row justify-center items-center gap-8">
      <div className="w-[90vh] h-[90vh] rounded-3xl">
        <MyIllust imgSrc={myIllustSrc}/>
      </div>

      <div className="h-[90vh] flex xl:flex-col gap-2">
        <div className="h-1/2 w-[45vh] bg-slate-300 rounded-2xl">
          <ContestInfo contest={data.contest}/>
        </div>

        <div className="h-1/2 w-[45vh] flex flex-col gap-2">
          <div className="h-[30%] bg-slate-300 rounded-2xl">
          </div>
          <div className="flex-grow bg-slate-300 rounded-2xl">

          </div>
          <div className="h-[20%] bg-slate-300 rounded-2xl">

          </div>
        </div>
      </div>

    </div>
    <div className="flex flex-col space-y-2 items-start">
      <TempLink pageName="post"/>
      <TempLink pageName="register"/>
      <TempLink pageName="login"/>
      <TempLink pageName="judge"/>
      <TempLink pageName="ranking"/>
    </div> 
  </>)
}

const TempLink:React.FC<{pageName:string}> = ({pageName})=>{
  return(
    <Link href={pageName} className="underline underline-offset-2">{pageName}</Link>
  )
}