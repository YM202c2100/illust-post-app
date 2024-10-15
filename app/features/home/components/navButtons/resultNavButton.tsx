import Link from "next/link"

export const ResultNavButton:React.FC = ()=>{
  return(
    <Link href={"result"} className="block h-full">
      <div>コンテスト結果</div>
    </Link>
  )
}