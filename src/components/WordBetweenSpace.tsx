import './WordBetweenSpace.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useDrop } from 'react-dnd';

import { LetterInstance } from '../shared/models/LetterInstance';
import { GameContext } from '../stores/GameContext';

export const WordBetweenSpace: React.FC<{ spaceIndex: number }> = observer(({ spaceIndex }) => {
  const { playerWord, onDropLetterBetween } = useContext(GameContext)

  const [{ isOver }, drop] = useDrop({
    accept: ["letter"],
    drop: (storeLetter: LetterInstance) => onDropLetterBetween(storeLetter, spaceIndex),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isBetweenLetters = playerWord.some(letter => letter.position === spaceIndex)
    && (spaceIndex === 0 || playerWord.some(letter => letter.position === spaceIndex - 1))

  if (!isBetweenLetters) {
    return null
  }

  return (
    <div ref={drop} className="player-area-between-space">
      {isOver && (
        <div className="player-between-drop-overlay"/>
      )}
    </div>
  )
})