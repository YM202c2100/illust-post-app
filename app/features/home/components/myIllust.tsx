import Image from "next/image"

export const MyIllust:React.FC<{imgSrc:string|null}>= ({imgSrc})=>{
  
  return (
    <div className="relative w-full h-full">
      {imgSrc ?
        <Image
          src={imgSrc} alt="your submitted illust"
          layout="fill" objectFit="cover"
          className="shadow-xl shadow-slate-500 rounded-3xl"
        />
        :
        <div>Image is not submitted</div>
      }
    </div>
  )
}