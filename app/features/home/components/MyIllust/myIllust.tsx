import Image from "next/image"

export const MyIllust:React.FC<{imgSrc:string|null}>= ({imgSrc})=>{
  
  return (
    <div className="relative w-full h-full">
      {imgSrc ?
        <Image
          src={imgSrc} alt="your submitted illust"
          fill style={{objectFit:"cover"}}
          sizes="(max-width 1000px) 90vw, 70vw"
          className="shadow-2xl shadow-zinc-600 rounded-3xl object-cover"
        />
        :
        <div className="flex justify-center items-center bg-gray-300 w-full h-full rounded-3xl text-2xl">
          作品は投稿されていません
        </div>
      }
    </div>
  )
}