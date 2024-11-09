import { RefObject, useEffect } from "react"

export function useEnterAnimation(scrollContainerRef:RefObject<HTMLDivElement>){
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return
    
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth
    const midScrollLeft = maxScrollLeft / 2

    setTimeout(()=>{
      // 瞬間的に二つ目の画像の位置までスクロール
      scrollContainer.scrollTo({ left: maxScrollLeft, behavior: 'auto' })
      
      // スクロールした一秒後に、真ん中までスクロール
      setTimeout(() => {
        scrollContainer.scrollTo({ left: midScrollLeft, behavior: 'smooth' })
      }, 1000)
    }, 500)
  },[])
}