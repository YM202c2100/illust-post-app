import { ImageWithRP } from "@/app/models/result.model"
import { OthersImage } from "./othersImage"

export const Top3Images:React.FC<{images:ImageWithRP[]}> = ({images})=>{
  
  return(
    <div>
        <p className="text-3xl">上位3作品</p>
        <div className="grid grid-cols-3">
          {images.map( image => <OthersImage image={image}/>)}
        </div>
    </div>
  )
}