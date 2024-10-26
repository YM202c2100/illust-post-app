import Link from "next/link";

export const JudgeNavButton:React.FC<{limitCanJudge:number|null}> = ({limitCanJudge})=>{
  return(
    <Link 
      href={"judge"}
      className="py-5 bg-zinc-800 text-white hover:bg-zinc-700 h-full rounded-2xl md:text-2xl p-2 flex flex-col"
    >
      <div className="grid grid-cols-2 flex-grow">
        <div className="text-center landscape:text-left">ジャッジ</div>
        <div className="text-end self-end">残り回数：{limitCanJudge ?? "-"}/3</div>
      </div>
      {(limitCanJudge===null) && <div className="text-xs mt-4">※ジャッジを行うには、コンテストに作品を投稿する必要があります</div>}
    </Link>
  )
}