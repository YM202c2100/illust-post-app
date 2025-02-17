import { GET } from "./api/getRequest";
import { convertToValidSrc } from "./libs/helper";
import { HomeDataGET } from "./models/pages/home.model";
import { MyIllust } from "./features/home/components/MyIllust/myIllust";
import { ContestInfo } from "./features/home/components/ContestInfo/contestInfo";
import { NavButtonBasedOnPeriod } from "./features/home/components/navButtons/navButtonBasedOnPeriod";
import { ResultNavButton } from "./features/home/components/navButtons/resultNavButton";
import { redirect } from "next/navigation";

export default async function Home(){
  const res = await GET("home")
  if(!res.ok){
    return <div>エラーが発生しました。時間をおいて再度お試しください。</div>
  }

  const data:HomeDataGET = await res.json()

  if(!data.isLogin){
    redirect("login")
  }

  const myIllustSrc = data.submittedFileName ?
                        convertToValidSrc(data.submittedFileName)
                        :null

  return(
    <div className="p-4 mx-auto flex flex-col landscape:flex-row items-center justify-center gap-2 landscape:gap-6 ">
      <div className="w-[90vw] landscape:w-[90vh] aspect-square">
        <MyIllust imgSrc={myIllustSrc}/>
      </div>

      <div className="w-[90vw] landscape:w-[45vh] landscape:h-[90vh] landscape:grid grid-rows-4 space-y-2">
        <div className="row-span-2">
          <ContestInfo contest={data.contest}/>
        </div>
        <div className="row-span-1">
          <NavButtonBasedOnPeriod contest={data.contest} limitCanJudge={data.limitCanJudge} isSubmitted={!!data.submittedFileName}/>
        </div>
        <div className="row-span-1">
          <ResultNavButton rankPoints={data.rankPoints}/>
        </div>
      </div>
    </div>
  )
}