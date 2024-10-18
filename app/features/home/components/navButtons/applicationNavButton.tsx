import Link from "next/link"

export const ApplicationNavButton:React.FC = ()=>{
  return (
    <Link 
      href={"post"}
      className=" bg-zinc-800 text-white hover:bg-zinc-700 h-full rounded-2xl text-2xl p-2 flex flex-col justify-between"
    >
      <div>作品を投稿する</div>
    </Link>
  )
}