import { ContestData } from "@/app/models/home.model"
import { JudgeNavButton } from "./judgeNavButton"

export const NavButtonBasedOnPeriod:React.FC<{contest:ContestData, limitCanJudge:number|null}> = ({contest, limitCanJudge})=>{
  type Phase = 'outsidePeriod'|'application'|'judge'

  const currentPhase:Phase = getCurrentPhase(contest)

  return(
    <div className="w-full h-full">
      {(currentPhase === 'application') && 
        <div>application navigation button</div>
      }
      
      {(currentPhase === 'judge') && 
        <JudgeNavButton limitCanJudge={limitCanJudge}/>
      }

      {(currentPhase === 'outsidePeriod') && 
        <div>disable button</div>
      }
    </div>
  )

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