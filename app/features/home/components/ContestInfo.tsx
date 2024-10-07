import { ContestData } from "@/app/models/home.model";

export const ContestInfo:React.FC<{contest:ContestData}> = ({contest})=>{
  const {roundNum, subject, applicationPeriod, judgePeriod} = contest
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
}