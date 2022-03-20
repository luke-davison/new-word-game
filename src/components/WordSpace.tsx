import './WordSpace.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { ShopLetter } from '../models';
import { GameContext } from '../stores/GameContext';
import { LetterShopLetter } from './LetterShop';
import { WordSpacePoints } from './WordSpacePoints';

export const WordSpace: React.FC<{ spaceIndex: number }> = observer(({ spaceIndex }) => {
  const { playerWord, onDropLetter, onQuickRemoveLetter } = useContext(GameContext)

  const letter = playerWord.find((letter) => letter.position === spaceIndex)
  const [{ isOver }, drop] = useDrop({
    accept: ["letter"],
    drop: (storeLetter: ShopLetter) => onDropLetter(storeLetter, spaceIndex),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const onDoubleClick = () => {
    if (letter) {
      onQuickRemoveLetter(letter)
    }
  }

  return (
    <div ref={drop} className="player-area-space" onDoubleClick={onDoubleClick}>
      {letter && (
        <LetterShopLetter letter={letter}/>
      )}
      {isOver && (
        <div className="player-space-drop-overlay"/>
      )}
      <WordSpacePoints spaceIndex={spaceIndex}/>
    </div>
  )
})