import { ImageWithRP } from "@/app/models/result.model"
import { OthersImage } from "./othersImage"

export const Top3Images:React.FC<{images:ImageWithRP[]}> = ({images})=>{
  
  return(
    <div>
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-end gap-4">
        <div className="w-[90%]">
          <p className="text-center">1位</p>
          <div className="flex justify-between">
            <p>{images[0].user_name}</p>
            <p>{images[0].rank_points} RP</p>
          </div>
          <div className="w-full aspect-square bg-red-300"></div>
        </div>

        <div className="w-[80%]">
          <p className="text-center">2位</p>
          <div className="flex justify-between">
            <p>{images[1].user_name}</p>
            <p>{images[1].rank_points} RP</p>
          </div>
          <div className="w-full aspect-square bg-blue-300"></div>
        </div>

        <div className="w-[80%]">
          <p className="text-center">3位</p>
          <div className="flex justify-between">
            <p>{images[2].user_name}</p>
            <p>{images[2].rank_points} RP</p>
          </div>
          <div className="w-full aspect-square bg-green-300"></div>
        </div>
      </div>
        <p className="text-3xl">上位3作品</p>
        <div className="grid grid-cols-3">
          {images.map( image => <OthersImage image={image}/>)}
        </div>
    </div>
  )
}