export const PostButton:React.FC<{isDisable:boolean}> = ({isDisable})=>{
  return(
    <button 
      type="submit" 
      form="imagePostForm" 
      formEncType="multipart/form-data"
      disabled={isDisable}
    >提出する</button>
  )
}