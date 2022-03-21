import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { GameContext } from '../stores/GameContext';

export const Info: React.FC = observer(() => {
  const { isValidWord, wordPoints } = useContext(GameContext)

  return (
    <div className="info-area">
      <div className="valid-area">
        <span>Word:</span>
        <span>{isValidWord ? "Valid" : "Invalid"}</span>
      </div>
      <div className="points-area">
        <span>Points:</span>
        <span>{wordPoints}</span>
      </div>
    </div>
  )
})