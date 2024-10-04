import { ContestData } from "@/app/models/home.model";

export const ContestInfo:React.FC<{contest:ContestData}> = ({contest})=>{
  const {round_num, subject, applicationPeriod, judgePeriod} = contest
  return(
    <div>
      <div>第{round_num}回 コンテスト</div>
      <div>「{subject}」</div>
      <div>
        <div>応募期間</div>
        <div>
          {applicationPeriod.start_at}～{applicationPeriod.end_at}
        </div>
      </div>
      <div>
        <div>審査期間</div>
        <div>
          {judgePeriod.start_at}～{judgePeriod.end_at}
        </div>
      </div>
    </div>
  )
}