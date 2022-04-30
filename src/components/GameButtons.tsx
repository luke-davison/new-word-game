import './GameButtons.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { GameContext } from '../stores/GameContext';

export const GameButtons: React.FC = observer(() => {
  const { onClear, isValidText, isValidWord, submitWord } = useContext(GameContext)

  return (
    <div className="submit-area">
      <div className="status-text">{isValidText || " "}</div>
      <button className="clear-button" onClick={onClear}>Clear</button>
      <button className="submit-button" onClick={submitWord} disabled={!isValidWord}>Submit</button>
    </div>
  )
})