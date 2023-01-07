import "./styles/Popup.css"

import { observer } from "mobx-react-lite";
import { FunctionComponent, useEffect } from "react";

interface PopupProps {
  onClose: () => void
}

export const Popup: FunctionComponent<PopupProps> = observer(({ children, onClose }) => {
  useEffect(() => {
    const listener = () => {
      onClose()
    }

    document.body.addEventListener('click', listener);
    return () => document.body.removeEventListener('click', listener)
  }, [onClose])

  return (
    <div className="popup">
      { children }
    </div>
  )
})