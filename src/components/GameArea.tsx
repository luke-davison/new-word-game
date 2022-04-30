import './GameArea.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { LetterInstance } from '../shared/models/LetterInstance';
import { GameContext } from '../stores/GameContext';
import { CampaignCounters } from './CampaignCounters';
import { Counters } from './Counters';
import { GameButtons } from './GameButtons';
import { Inventory } from './Inventory';
import { LetterShop } from './LetterShop';
import { PlayerArea } from './PlayerArea';
import { SecretShop } from './SecretShop';

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
      <GameButtons/>
    </div>
  )
})