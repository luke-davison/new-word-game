import './styles/GameButtons.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../../../stores/AppContext';
import { GameContext } from '../../../stores/GameContext';

export const GameButtons: React.FC = observer(() => {
  const { isPlayingCampaignGame } = useContext(AppContext)
  const { onClear, isValidText, isValidWord, submitWord } = useContext(GameContext)

  const showSubmitButton = isPlayingCampaignGame

  return (
    <div className="submit-area">
      <div className="status-text">{isValidText || " "}</div>
      <button className="clear-button" onClick={onClear}>Clear</button>
      {showSubmitButton && (
        <button className="submit-button" onClick={submitWord} disabled={!isValidWord}>Submit</button>
      )}
    </div>
  )
})