import { ContestData, PeriodData } from "@/app/models/home.model";

export const ContestInfo:React.FC<{contest:ContestData}> = ({contest})=>{
  const {roundNum, subject, applicationPeriod, judgePeriod} = contest

  formatPeriod(applicationPeriod)
  formatPeriod(judgePeriod)
  
  return(
    <div>
      <div>第{roundNum}回 コンテスト</div>
      <div>「{subject}」</div>
      <div>
        <div>応募期間</div>
        <div>
          {applicationPeriod.startAt}～{applicationPeriod.endAt}
        </div>
      </div>
      <div>
        <div>審査期間</div>
        <div>
          {judgePeriod.startAt}～{judgePeriod.endAt}
        </div>
      </div>
    </div>
  )

  function formatPeriod(period: PeriodData){
    period.startAt = formatDate(period.startAt)
    period.endAt = formatDate(period.endAt)
  }

  function formatDate(dateTime:string){
    const dateISO8601 = new Date(dateTime)
    const month = dateISO8601.getMonth()
    const date = dateISO8601.getDate()
    return `${month}/${date}`
  }
}