import './styles/GameArea.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { LetterInstance } from '../../../models/LetterInstance';
import { GameContext } from '../../../stores/GameContext';
import { CampaignCounters } from '../campaign/CampaignCounters';
import { Counters } from './Counters';
import { Inventory } from '../campaign/Inventory';
import { LetterShop } from './LetterShop';
import { PlayerArea } from './PlayerArea';
import { SecretShop } from '../campaign/SecretShop';

export const GameArea: React.FC = observer(() => {
  const { onDropLetterOutside } = useContext(GameContext)

  const [dropOptions, drop] = useDrop({
    accept: ["letter"],
    drop: (letter: LetterInstance, monitor) => {
      if (monitor.didDrop()) {
        return
      }
      onDropLetterOutside(letter)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return (
    <div ref={drop} className="game-area">
      <LetterShop/>
      <Counters/>
      <PlayerArea/>
      <CampaignCounters/>
      <Inventory/>
      <SecretShop/>
    </div>
  )
})