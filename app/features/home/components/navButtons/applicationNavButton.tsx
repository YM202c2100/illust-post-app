import Link from "next/link"

export const ApplicationNavButton:React.FC<{isSubmitted:boolean}> = ({isSubmitted})=>{
  return (
    <Link 
      href={"post"}
      className=" bg-zinc-800 text-white hover:bg-zinc-700 h-full rounded-2xl text-2xl p-2 flex flex-col justify-between"
    >
      <div>{isSubmitted ? "作品を投稿しなおす":"作品を投稿する"}</div>
    </Link>
  )
}