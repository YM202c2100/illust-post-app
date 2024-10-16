import Link from "next/link";

export const JudgeNavButton:React.FC<{limitCanJudge:number|null}> = ({limitCanJudge})=>{
  return(
    <Link 
      href={"judge"}
      className=" bg-zinc-800 text-white hover:bg-zinc-700 h-full rounded-2xl text-2xl p-2 flex flex-col justify-between"
    >
      <div>ジャッジ</div>
      <div className="text-end">残り回数：{limitCanJudge ?? 0}/3</div>
      {(limitCanJudge===null) && <div>ジャッジを行うには、コンテストに作品を投稿する必要があります</div>}
    </Link>
  )
}