import { calcOffset, SelectedSideType, SelectSideAction } from "./imagesToJudge"
import { Dispatch, SetStateAction, useState } from "react"

type ConfirmButtonProps = {
  selectedSide:SelectedSideType
  limitCanJudge:number
  setLimitCanJudge:Dispatch<SetStateAction<number>>
  dispatchSelectedSide:Dispatch<{type:SelectSideAction}>
}

export const ConfirmButton:React.FC<ConfirmButtonProps> = ({selectedSide, limitCanJudge, setLimitCanJudge, dispatchSelectedSide})=>{
  const [isPending, setIsPending] = useState<boolean>(false)
  const isButtonDisable = (selectedSide===null) || isPending
  return(
    <div className="text-center my-2">
      <button
        disabled={isButtonDisable}
        className={`text-gray-100 p-3 rounded-2xl ${isButtonDisable ? "bg-gray-400":"bg-green-500"}`}
        onClick={()=>{
          if(selectedSide !== null){
            setIsPending(true)
            confirmRequest(limitCanJudge,selectedSide)
          }
        }}
      >
        こっちが良い！
      </button>
    </div>
  )

  async function confirmRequest(limitCanJudge:number, selectedSide:NonNullable<SelectedSideType>){
    const offset = calcOffset(limitCanJudge)
    const winnerIndex = offset+selectedSide
    const loserIndex = offset+Number(!selectedSide)
  
    const judgeResult = {
      winnerIndex:winnerIndex,
      loserIndex:loserIndex
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
    setIsPending(false)
    dispatchSelectedSide({type:"reset"})
  }
}
