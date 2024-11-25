import Link from "next/link";

export const JudgeNavButton:React.FC<{limitCanJudge:number|null}> = ({limitCanJudge})=>{
  const isSubmitted = (limitCanJudge !== null)
  return(
    <Link 
      href={"judge"}
      className={`py-5 px-2 h-full rounded-2xl flex flex-col
        text-white md:text-2xl 
        ${isSubmitted ? "bg-zinc-800 hover:bg-zinc-700":"pointer-events-none bg-slate-400"}`
      }
    >
      <div className="grid grid-cols-2 flex-grow">
        <div className="text-center landscape:text-left">ジャッジ</div>
        <div className="text-center self-end">残り回数：{limitCanJudge ?? "-"}/3</div>
      </div>
      {!isSubmitted && <div className="text-xs mt-4">※ジャッジを行うには、コンテストに作品を投稿する必要があります</div>}
    </Link>
  )
}