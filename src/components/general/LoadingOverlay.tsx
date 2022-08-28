import "./styles/LoadingOverlay.css"

import { observer } from "mobx-react-lite"
import { FunctionComponent, useContext, useEffect, useState } from "react"
import { AppContext } from "../../stores/AppContext"

export const LoadingOverlay: FunctionComponent = observer(() => {

  const { isError, isLoading } = useContext(AppContext)

  const [loadingDelayElapsed, setLoadingDelayElapsed] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setLoadingDelayElapsed(true)
    }, 600)
  }, [])

  if (!isError && !isLoading) {
    return null
  }

  let classNames = "loading-overlay"
  if (loadingDelayElapsed || isError) {
    classNames += " show-overlay"
  }
  
  return (
    <div className={classNames}>
      {isError && (
        <div className="error-text">
          An error occurred - please refresh and try again
        </div>
      )}
      {isLoading && (
        <div className="loading-text">
          Loading
        </div>
      )}
    </div>
  )
})