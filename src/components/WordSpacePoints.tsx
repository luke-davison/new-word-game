import './WordSpacePoints.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { getAbilityIsActive } from '../shared/utils/abilities/getAbilityIsActive';
import { getAbilityPoints } from '../shared/utils/abilities/getAbilityPoints';
import { AppContext } from '../stores/AppContext';
import { GameContext } from '../stores/GameContext';

export const WordSpacePoints: React.FC<{ spaceIndex: number }> = observer(({ spaceIndex }) => {
  const { player } = useContext(AppContext)
  const { playerWord } = useContext(GameContext)

  const letter = playerWord.find((letter) => letter.position === spaceIndex)
  
  if (letter) {
    let points = letter.points
    if (!letter.isWild && getAbilityIsActive(playerWord, spaceIndex, player)) {
      points += getAbilityPoints(playerWord, spaceIndex, player)
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