import './WordSpacePoints.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { GameContext } from '../stores/GameContext';

export const WordSpacePoints: React.FC<{ spaceIndex: number }> = observer(({ spaceIndex }) => {
  const { playerWord } = useContext(GameContext)

  const letter = playerWord.find((letter) => letter.position === spaceIndex)

  if (letter) {
    return (
      <div className="word-space-points">
        { spaceIndex !== 0 && <span>+</span>}
        <span>{letter.points}</span>
        { letter.ability && !letter.isWild && (
          <>
            <span>+</span>
            <span>{letter.ability.getIsActive(playerWord, spaceIndex) ? letter.ability.getPoints(playerWord, spaceIndex) : 0}</span>
          </>
        )}
      </div>
    )
  }

  return <div/>
})