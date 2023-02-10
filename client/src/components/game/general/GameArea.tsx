import './styles/GameArea.css'

import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'

import { LetterInstance } from '../../../models/LetterInstance'
import { GameContext } from '../../../stores/GameContext'
import { CampaignCounters } from '../campaign/CampaignCounters'
import { Counters } from './Counters'
import { LetterShop } from './LetterShop'
import { PlayerArea } from './PlayerArea'

export const GameArea: React.FC = observer(() => {
  const { onDropLetterOutside } = useContext(GameContext)

  const [, drop] = useDrop({
    accept: ['letter'],
    drop: (letter: LetterInstance, monitor) => {
      if (monitor.didDrop()) {
        return
      }
      onDropLetterOutside(letter)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  return (
    <div ref={drop} className="game-area">
      <div className="game-top-row">
        <LetterShop/>
      </div>
      <Counters/>
      <PlayerArea/>
      <CampaignCounters/>
    </div>
  )
})