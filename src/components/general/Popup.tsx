import "./styles/Popup.css"

import { observer } from "mobx-react-lite";
import { FunctionComponent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export interface PopupProps {
  elementId?: string;
  onClose: () => void
}

const X_OFFSET = 0
const Y_OFFSET = 15

export const Popup: FunctionComponent<PopupProps> = observer(({ children, elementId, onClose }) => {
  const popupRef = useRef<HTMLDivElement | null>(null)
  const timeout = useRef<NodeJS.Timer>()
  const [position, setPosition] = useState<{ top?: number, left?: number, bottom?: number, right?: number }>()

  useEffect(() => {
    const listener = () => {
      onClose()
    }

    document.body.addEventListener('click', listener);
    return () => document.body.removeEventListener('click', listener)
  }, [onClose])

  const recalculatePosition = useCallback(() => {
    if (elementId) {
      const element = document.getElementById(elementId)
      if (element && popupRef.current) {
        const elementRect = element.getBoundingClientRect()
        const popupRect = element.getBoundingClientRect();
        const popupWidth = popupRef.current.offsetWidth
        const popupHeight = popupRef.current.offsetHeight
        const isAbove = elementRect.bottom + Y_OFFSET + popupRect.height > window.innerHeight
        const isLeft = elementRect.left + X_OFFSET + popupRef.current.offsetWidth > window.innerWidth
        setPosition({
          left: isLeft ? elementRect.right - X_OFFSET - popupWidth : elementRect.left + X_OFFSET,
          top: isAbove ? elementRect.top - Y_OFFSET - popupHeight : elementRect.bottom + Y_OFFSET
        })
      }
    }
  }, [elementId])

  useLayoutEffect(() => {
    setTimeout(() => {
      recalculatePosition();
    }, 1)
    timeout.current = setInterval(recalculatePosition, 1000)
  }, [recalculatePosition])

  useEffect(() => {
    return () => {
      if (timeout.current !== undefined) {
        clearInterval(timeout.current)
      }
    }
  }, [])

  const style = position || { opacity: 0 }; // opacity 0 will hide the element on the first render, so the position can be calculated

  return (
    <div ref={popupRef} className="popup" style={style}>
      { children }
    </div>
  )
})