import { ImageWithRP } from "@/app/models/pages/result.model"
import { OthersImage } from "./othersImage"

export const HigherRankImages:React.FC<{images:ImageWithRP[]}> = ({images})=>{
  return(
    <div>
      <div className="text-3xl">自分より上位の作品</div>
      
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-4">
        {images.map((image)=>(
          <HigherRankSubmission image={image} key={image.user_name+image.rank_points}/>
        ))}
      </div>
    </div>
  )
}

const HigherRankSubmission:React.FC<{image: ImageWithRP}> = ({image})=>{
  return(
    <div className="w-[90%]">
      <OthersImage image={image}/>
    </div>
  )
}