import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { ShopLetter } from '../models';
import { GameContext } from '../stores/GameContext';
import { LetterShop } from './LetterShop';
import { PlayerArea } from './PlayerArea';
import { Submit } from './Submit';

export const GameArea: React.FC = observer(() => {
  const { onDropLetterOutside } = useContext(GameContext)

  const [dropOptions, drop] = useDrop({
    accept: ["letter"],
    drop: (storeLetter: ShopLetter, monitor) => {
      if (monitor.didDrop()) {
        return
      }
      onDropLetterOutside(storeLetter)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return (
    <div ref={drop} className="game-area">
      <LetterShop/>
      <PlayerArea/>
      <Submit/>
    </div>
  )
})