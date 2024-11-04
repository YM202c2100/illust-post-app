import { ImageWithRP } from "@/app/models/pages/result.model"
import Image from "next/image"

export const OthersImage:React.FC<{
  image:ImageWithRP
}> = ({image})=>{
  return(<>
    <div className="flex justify-between mx-2">
        <p>{image.user_name}</p>
        <p>{image.rank_points} RP</p>
      </div>
      <div className="w-full aspect-square relative rounded-xl overflow-hidden">
        <Image src={`/postedImages/${image.file_name}`} 
          alt="others submission" 
          fill style={{objectFit:"cover"}}
          sizes="(max-width: 768px) 90vw, 40vw"/>
    </div>
  </>)
}