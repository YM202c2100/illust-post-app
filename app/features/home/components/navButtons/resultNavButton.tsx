import Link from "next/link"

export const ResultNavButton:React.FC = ()=>{
  return(
    <Link href={"result"} className="block h-full bg-zinc-800 text-white rounded-2xl">
      <div>コンテスト結果</div>
    </Link>
  )
}