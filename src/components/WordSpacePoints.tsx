import './WordSpacePoints.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { GameContext } from '../stores/GameContext';

export const WordSpacePoints: React.FC<{ spaceIndex: number }> = observer(({ spaceIndex }) => {
  const { playerWord } = useContext(GameContext)

  const letter = playerWord.find((letter) => letter.position === spaceIndex)
  
  if (letter) {
    let points = letter.points
    if (!letter.isWild && letter.ability?.getIsActive(playerWord, spaceIndex)) {
      points += letter.ability.getPoints(playerWord, spaceIndex)
    }
    return (
      <div className="word-space-points">
        { spaceIndex !== 0 && <span>+</span>}
        <span>{points}</span>
      </div>
    )
  }

  return <div/>
})