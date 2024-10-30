import { ImageWithRP } from "@/app/models/pages/result.model"
import { OthersImage } from "./othersImage"

export const HigherRankImages:React.FC<{images:ImageWithRP[]}> = ({images})=>{
  return(
    <div>
      <div className="text-3xl">自分より上位の作品</div>
      
      <div className="grid grid-cols-3">
        {images.map(image => <OthersImage image={image}/>)}
      </div>
    </div>
  )
}