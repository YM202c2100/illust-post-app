import { ImageToJudge } from "@/app/models/pages/judge.model"
import { SelectedSide, SelectedSideType } from "./imagesToJudge"
import { Dispatch, SetStateAction } from "react"

type ConfirmButtonProps = {
  selectedSide:SelectedSideType
  images:ImageToJudge[]
  setLimitCanJudge:Dispatch<SetStateAction<number>>
}

export const ConfirmButton:React.FC<ConfirmButtonProps> = ({selectedSide, images, setLimitCanJudge})=>{
  return(
    <div className="text-center my-2">
      <button
      disabled={selectedSide===null}
      className="bg-green-500 text-gray-100 p-3 rounded-2xl"
      onClick={()=>{
        if(selectedSide !== null){
          chooseImage(selectedSide)
        }
      }}
      >
        こっちが良い！
      </button>
    </div>
  )

  async function chooseImage(winnerIndex:NonNullable<SelectedSideType>){
    const loserIndex = (winnerIndex===SelectedSide.left) ? SelectedSide.right:SelectedSide.left
  
    const judgeResult = {
      winnerId:images[winnerIndex].user_id,
      loserId:images[loserIndex].user_id
    }
  
    const body = JSON.stringify(judgeResult)
  
    const res = await fetch("features/judge/api",{
      method:"post",
      body:body,
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      }
    })
  
    if(!res.ok){
      const data = await res.json()
      console.error(data.errMsg)
    }
  
    setLimitCanJudge(prev => prev - 1)
  }
}
