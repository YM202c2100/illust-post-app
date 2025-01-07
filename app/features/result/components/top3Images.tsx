import { ImageWithRP } from "@/app/models/pages/result.model"
import { OthersImage } from "./othersImage"

export const Top3Images:React.FC<{images:ImageWithRP[]}> = ({images})=>{
  
  return(
    <div>
      <p className="text-3xl">上位3作品</p>
      <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
        {images.map((image, idx)=>(
          <Top3Image image={image} order={idx+1} key={image.user_name+idx}/>
        ))}
      </div>
    </div>
  )
}

const Top3Image:React.FC<{image: ImageWithRP, order:number}> = ({image, order})=>{
  return(
    <div className={`text-center ${(order === 1) ? "w-[90%]" : "w-[80%]"}`}>
      <p className="text-2xl">{`${order}位`}</p>
      <OthersImage image={image}/>
    </div>
  )
}