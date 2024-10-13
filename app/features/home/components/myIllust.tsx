import Image from "next/image"

export const MyIllust:React.FC<{imgSrc:string|null}>= ({imgSrc})=>{
  
  return (
    <div className="w-full h-full relative">
      {imgSrc ? 
        <Image src={imgSrc} alt="your submitted illust" fill objectFit="contain"/>
        :<div>Image is not submitted</div>
      }
    </div>
  )
}