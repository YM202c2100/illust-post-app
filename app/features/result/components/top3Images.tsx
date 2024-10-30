import { ImageWithRP } from "@/app/models/pages/result.model"
import Image from "next/image"

export const Top3Images:React.FC<{images:ImageWithRP[]}> = ({images})=>{
  
  return(
    <div>
      <p className="text-3xl">上位3作品</p>
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-end gap-4">
        {images.map((image, idx)=>(
          <Top3Image image={image} order={idx+1}/>
        ))}
      </div>
    </div>
  )
}

const Top3Image:React.FC<{image: ImageWithRP, order:number}> = ({image, order})=>{
  return(
    <div key={image.user_name+order} className={`text-center ${(order === 1) ? "w-[90%]" : "w-[80%]"}`}>
      <p className="text-2xl">{`${order}位`}</p>
      <div className="flex justify-between mx-2">
        <p>{image.user_name}</p>
        <p>{image.rank_points} RP</p>
      </div>
      <div className="w-full aspect-square relative rounded-xl overflow-hidden">
        <Image src={`/postedImages/${image.file_name}`} alt="top3 images" fill style={{objectFit:"cover"}}/>
      </div>
    </div>
  )
}