import './styles/PreviousGamesMenuKey.css'

import { observer } from 'mobx-react-lite'
import { FunctionComponent } from 'react'

export const PreviousGamesMenuKey: FunctionComponent = observer(() => {
  

  return (
    <div className="previous-games-menu-key">
      <div className="previous-games-menu-key-item">
        <span className="key-item day-attempted"/>
        <span>Attempted</span>
      </div>
      <div className="previous-games-menu-key-item">
        <span className="key-item day-met-target"/>
        <span>Met target</span>
      </div>
      <div className="previous-games-menu-key-item">
        <span className="key-item day-secret-target"/>
        <span>Met secret target</span>
      </div>
      <div className="previous-games-menu-key-item">
        <span className="key-item day-unavailable"/>
        <span>Unavailable</span>
      </div>
    </div>
  )
})