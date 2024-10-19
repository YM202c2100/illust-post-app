import { ImageWithRP } from "@/app/models/result.model"

export const OthersImage:React.FC<{
  image:ImageWithRP
}> = ({image})=>{
  return(
    <div key={image.user_name+image.file_name+image.rank_points}>
      <img src={`/postedImages/${image.file_name}`} width={300}/>
      <p>{image.user_name}</p>
      <p>{image.rank_points}</p>
    </div>
  )
}