import { useEffect, useRef, useState } from "react"
import { getCoords } from "../utils/js"

export function useDropdown(isOpen: boolean) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen)
  const refDrop = useRef<HTMLDivElement>(null)
  const refCur = useRef<HTMLDivElement>(null)

  const handleOpen = () => setIsDropdownOpen(!isDropdownOpen)

  useEffect(() => {

    if (isDropdownOpen) {
      const currentTarget = refCur.current
      const dropdown = refDrop.current
      if (dropdown !== null && currentTarget !== null) {
        dropdown.style.cssText = "position:absolute; width:auto;"

        const coords = getCoords(currentTarget)
        dropdown.style.left = coords.left + "px"
        dropdown.style.top = coords.bottom + "px"
      }
    }
  }, [isDropdownOpen])

  return { refDrop, refCur, handleOpen, isDropdownOpen }
}