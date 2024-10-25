import Link from "next/link";
import { GET } from "./api/getRequest";
import { convertToValidSrc } from "./libs/helper";
import { HomeDataGET } from "./models/home.model";
import { MyIllust } from "./features/home/components/MyIllust/myIllust";
import { ContestInfo } from "./features/home/components/ContestInfo/contestInfo";
import { NavButtonBasedOnPeriod } from "./features/home/components/navButtons/navButtonBasedOnPeriod";
import { ResultNavButton } from "./features/home/components/navButtons/resultNavButton";

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
    <div className="w-full h-[200vw] md:h-auto grid grid-rows-2 md:grid-rows-none md:grid-cols-3">
      <div className="bg-orange-300 md:col-span-2 md:aspect-square"></div>

      <div className="grid grid-rows-2 grid-cols-2 md:grid-rows-4 md:grid-cols-none">
        <div className="bg-red-300 row-span-1 md:row-span-2 col-span-full"></div>
        <div className="bg-blue-300 row-span-1 col-span-1"></div>
        <div className="bg-green-300 row-span-1 col-span-1"></div>
      </div>
    </div>


    <div className="flex flex-col xl:flex-row justify-center items-center gap-8 bg-white">
      <div className="w-[90vh] h-[90vh] rounded-3xl">
        <MyIllust imgSrc={myIllustSrc}/>
      </div>

      <div className="h-[90vh] flex xl:flex-col gap-2">
        <div className="h-1/2 w-[45vh]">
          <ContestInfo contest={data.contest}/>
        </div>

        <div className="h-1/2 w-[45vh] flex flex-col gap-2">
          <div className="h-[30%]">
            <NavButtonBasedOnPeriod contest={data.contest} limitCanJudge={data.limitCanJudge} isSubmitted={!!data.submittedFileName}/>
          </div>
          <div className="h-[50%]">
            <ResultNavButton rankTier={data.rankTier}/>
          </div>
          <div className="flex-grow bg-zinc-800 rounded-2xl">

          </div>
        </div>
      </div>

    </div>
  </>)
}

const TempLink:React.FC<{pageName:string}> = ({pageName})=>{
  return(
    <Link href={pageName} className="underline underline-offset-2">{pageName}</Link>
  )
}