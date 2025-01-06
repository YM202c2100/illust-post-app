import { useEffect, useState } from "react"

export function useViewWidth(){
  const [viewWidth, setViewWidth] = useState<number>(800)
  useEffect(()=>{
    function calcViewWidth(){
      if(window.innerWidth > 1000){
        setViewWidth(800)
      }else{
        setViewWidth(window.innerWidth * 0.8)
      }
    }

    calcViewWidth()

    window.addEventListener("resize", calcViewWidth)

    return ()=>{
      window.removeEventListener("resize", calcViewWidth)
    }
  },[])

  return viewWidth
}