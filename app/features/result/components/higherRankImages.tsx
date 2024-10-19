import { ImageWithRP } from "@/app/models/result.model"
import { OthersImage } from "./othersImage"

export const HigherRankImages:React.FC<{images:ImageWithRP[]}> = ({images})=>{
  return(
    <div className="grid grid-cols-3">
      {images.map(image => <OthersImage image={image}/>)}
    </div>
  )
}