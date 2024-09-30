"use client"

export type ImageToJudgeProps = {
  user_id:number,
  file_name:string
}

// 引数のimages配列の要素数は2
export const ImagesToJudge:React.FC<{images:ImageToJudgeProps[]}> = ({images})=>{
  return(
    <div className="flex justify-around">
      {images.map((image,idx) => (
        <div key={image.user_id}>
          <img src={`/postedImages/${image.file_name}`} alt={image.file_name} width={700}/>
          <button onClick={()=>{chooseImage(idx)}}>選択</button>
        </div>
      ))}
    </div>
  )

  async function chooseImage(winnerIndex:number){
    const loserIndex = (winnerIndex===0) ? 1:0

    const judgeResult = {
      winnerId:images[winnerIndex].user_id,
      loserId:images[loserIndex].user_id
    }

    const body = JSON.stringify(judgeResult)

    const res = await fetch("features/judge/api",{
      method:"post",
      body:body,
      headers:{
        "Content-Type":"application/json"
      }
    })

    if(!res.ok){
      console.error("not ok")
    }

    const data = await res.json()
    console.log(data);
  }

}
