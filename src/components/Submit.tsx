import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { GameContext } from '../stores/GameContext';
import { getBestWords } from '../utils/getBestWords';

export const Submit: React.FC = observer(() => {
  const { game, onClear, isValidText } = useContext(GameContext)

  return (
    <>
      <div className="submit-area" style={{marginBottom: 20 }}>
        <button className="clear-button" onClick={onClear}>Clear</button>
        {isValidText}
      </div>
      <button onClick={() => getBestWords(game!)}>Compute possibilities</button>
    </>
  )
})