import './styles/Counters.css'

import { observer } from 'mobx-react-lite'

import { Money } from './Money'
import { WordPoints } from './WordPoints'
import { useContext } from 'react'
import { GameContext } from '../../../stores/GameContext'

export const Counters: React.FC = observer(() => {
  const { isValidText } = useContext(GameContext)
  
  return (
    <div className="counters-container">
      <Money/>
      <div className="status-text">
        {isValidText || " "}
      </div>
      <WordPoints/>
    </div>
  )
})