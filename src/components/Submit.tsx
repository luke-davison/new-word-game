import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { GameContext } from '../stores/GameContext';
import { getBestWords } from '../utils/getBestWords';

export const Submit: React.FC = observer(() => {
  const { isDevMode } = useContext(AppContext)
  const { game, onClear, isValidText } = useContext(GameContext)

  return (
    <>
      <div className="submit-area" style={{marginBottom: 20, marginTop: 20, textAlign: "center" }}>
        <div className="status-text" style={{height: 36}}>{isValidText || " "}</div>
        <button className="clear-button" onClick={onClear}>Clear</button>
      </div>
      {isDevMode && <button onClick={() => getBestWords(game!)}>Compute possibilities</button>}
    </>
  )
})