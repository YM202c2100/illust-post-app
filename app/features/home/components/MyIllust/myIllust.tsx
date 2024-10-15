import Image from "next/image"

export const MyIllust:React.FC<{imgSrc:string|null}>= ({imgSrc})=>{
  
  return (
    <div className="relative w-full h-full">
      {imgSrc ?
        <Image
          src={imgSrc} alt="your submitted illust"
          fill
          className="shadow-xl shadow-slate-400 rounded-3xl object-cover"
        />
        :
        <div>Image is not submitted</div>
      }
    </div>
  )
}