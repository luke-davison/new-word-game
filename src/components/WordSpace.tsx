import './WordSpace.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { ShopLetter } from '../models';
import { GameContext } from '../stores/GameContext';
import { Letter } from './Letter';
import { LetterShopLetter } from './LetterShop';

export const WordSpace: React.FC<{ spaceIndex: number }> = observer(({ spaceIndex }) => {
  const { playerWord, onDropLetter } = useContext(GameContext)

  const letter = playerWord.find((letter) => letter.position === spaceIndex)
  const [dropOptions, drop] = useDrop({
    accept: ["letter"],
    drop: (storeLetter: ShopLetter) => onDropLetter(storeLetter, spaceIndex),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return (
    <div ref={drop} className="player-area-space">
      {letter && (
        <LetterShopLetter letter={letter}/>
      )}
    </div>
  )
})