import { useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import { enableScroll } from "../utils/js"

export function usePostModal() {
  const history = useHistory()
  const ref = useRef<HTMLDivElement>(null)
  const refOverlay = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (refOverlay.current) {
      refOverlay.current.classList.add('visible')
    }

    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        if (refOverlay.current) {
          refOverlay.current.classList.remove('visible')
        }
        setTimeout(() => {
          // history.push('/')
          history.goBack()
          enableScroll()
        }, 300)

      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [refOverlay])

  return [ref, refOverlay]
}