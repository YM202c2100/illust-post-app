import { formatDate } from "@/app/libs/helper";
import { ContestData, PeriodData } from "@/app/models/pages/home.model";

export const ContestInfo:React.FC<{contest:ContestData}> = ({contest})=>{
  const {roundNum, subject, applicationPeriod, judgePeriod} = contest

  const formattedApplicationPeriod = formatPeriod(applicationPeriod)
  const formattedJudgePeriod = formatPeriod(judgePeriod)
  
  return(
    <div className="h-full py-3 bg-zinc-800 rounded-2xl text-white text-center grid grid-cols-2 landscape:grid-cols-none place-content-center">
      <div className="place-content-center">
        <div className="md:text-3xl">第{roundNum}回 コンテスト</div>

        <div className="md:text-4xl mt-2 relative">
          <div className="absolute -translate-x-1 -translate-y-1">「</div>
          <div className="mx-3 md:mx-7">{subject}</div>
          <div className="absolute right-0 bottom-0 translate-x-1 translate-y-1">」</div>
        </div>
      </div>

      <div className="md:text-3xl landscape:mt-4">
        <div>
          <div>応募期間</div>
          <div>
            {formattedApplicationPeriod.startAt}～{formattedApplicationPeriod.endAt}
          </div>
        </div>
        
        <div className="mt-2">
          <div>審査期間</div>
          <div>
            {formattedJudgePeriod.startAt}～{formattedJudgePeriod.endAt}
          </div>
        </div>
      </div>
    </div>
  )

  function formatPeriod(period: PeriodData){
    return {
      startAt: formatDate(period.startAt),
      endAt: formatDate(period.endAt)
    }
  }
}