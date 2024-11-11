import { RefObject, useEffect } from "react"

export function useEnterAnimation(scrollContainerRef:RefObject<HTMLDivElement>){
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return
    
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth
    
    setTimeout(()=>{
      // 瞬間的に二つ目の画像の位置までスクロール
      scrollContainer.scrollTo({ left: maxScrollLeft, behavior: 'smooth' })
      
      // スクロールした一秒後に、再び一つ目の画像までスクロール
      setTimeout(() => {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' })
      }, 1000)
    }, 500)
  },[])
}