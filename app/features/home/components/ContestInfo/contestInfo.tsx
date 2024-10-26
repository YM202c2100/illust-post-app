import { ContestData, PeriodData } from "@/app/models/home.model";

export const ContestInfo:React.FC<{contest:ContestData}> = ({contest})=>{
  const {roundNum, subject, applicationPeriod, judgePeriod} = contest

  const formattedApplicationPeriod = formatPeriod(applicationPeriod)
  const formattedJudgePeriod = formatPeriod(judgePeriod)
  
  return(
    <div className="h-full bg-zinc-800 rounded-2xl text-white text-center pt-4">
      <div className="md:text-3xl">第{roundNum}回 コンテスト</div>

        <div className="md:text-4xl mt-2 relative">
          <div className="absolute -translate-x-1 -translate-y-1">「</div>
          <div className="mx-3 md:mx-7">{subject}</div>
          <div className="absolute right-0 bottom-0 translate-x-1 translate-y-1">」</div>
        </div>
      </div>

      <div className="md:text-3xl mt-4">
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

  function formatDate(dateTime:string){
    const dateISO8601 = new Date(dateTime)
    
    //getMonthは0~11を返すため+1
    const month = dateISO8601.getMonth()+1
    const date = dateISO8601.getDate()
    return `${month}/${date}`
  }
}