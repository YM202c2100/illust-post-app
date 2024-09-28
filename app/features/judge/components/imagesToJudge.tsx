"use client"

export type ImageToJudgeProps = {
  id:number,
  file_name:string
}

// 引数のimages配列の要素数は2
export const ImagesToJudge:React.FC<{images:ImageToJudgeProps[]}> = ({images})=>{
  return(
    <div className="flex justify-around">
      {images.map((image,idx) => (
        <div key={image.id}>
          <img src={`/postedImages/${image.file_name}`} alt={image.file_name} width={700}/>
          <button onClick={()=>{chooseImage(idx)}}>選択</button>
        </div>
      ))}
    </div>
  )

  async function chooseImage(idx:number){
    const idList = [images[0].id, images[1].id]

    const judgeResult = {
      idList:idList,
      winnerId:images[idx].id
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
  }

}
