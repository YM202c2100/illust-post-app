import { ContestData } from "@/app/models/pages/home.model"
import { JudgeNavButton } from "./judgeNavButton"
import { ApplicationNavButton } from "./applicationNavButton"
import { OutSidePeriodButton } from "./outsidePeriodButton"

type PropsNavButtonBasedOnPeriod = {
  contest:ContestData,
  limitCanJudge:number|null,
  isSubmitted: boolean
}
export const NavButtonBasedOnPeriod:React.FC<PropsNavButtonBasedOnPeriod> = ({contest, limitCanJudge, isSubmitted})=>{
  type Phase = 'outsidePeriod'|'application'|'judge'

  const currentPhase:Phase = getCurrentPhase(contest)

  switch (currentPhase) {
    case "application":
      return <ApplicationNavButton isSubmitted={isSubmitted}/>
    case "judge":
      return <JudgeNavButton limitCanJudge={limitCanJudge}/>
    case "outsidePeriod":
      return <OutSidePeriodButton/>
  }

  function getCurrentPhase(contest:ContestData):Phase{
    const now = new Date();
    const applicationStart = new Date(contest.applicationPeriod.startAt)
    const applicationEnd = new Date(contest.applicationPeriod.endAt)
    const judgeStart = new Date(contest.judgePeriod.startAt)
    const judgeEnd = new Date(contest.judgePeriod.endAt)
    
    if(applicationStart<=now && now < applicationEnd){
      return 'application'
    }else if(judgeStart <= now && now < judgeEnd){
      return 'judge'
    }else{
      return 'outsidePeriod'
    }
  }
}