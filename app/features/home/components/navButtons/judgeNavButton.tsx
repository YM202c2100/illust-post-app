import Link from "next/link";

export const JudgeNavButton:React.FC<{limitCanJudge:number|null}> = ({limitCanJudge})=>{
  return(
    <Link 
      href={"judge"}
      className="py-3 bg-zinc-800 text-white hover:bg-zinc-700 h-full rounded-2xl text-2xl p-2 flex flex-col justify-between"
    >
      <div>ジャッジ</div>
      <div className="text-end">残り回数：{limitCanJudge ?? "-"}/3</div>
      {(limitCanJudge===null) && <div className="text-sm">※ジャッジを行うには、コンテストに作品を投稿する必要があります</div>}
    </Link>
  )
}