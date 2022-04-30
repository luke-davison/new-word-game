import './GameButtons.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { GameContext } from '../stores/GameContext';

export const GameButtons: React.FC = observer(() => {
  const { isPlayingCampaignGame } = useContext(AppContext)
  const { onClear, isValidText, isValidWord } = useContext(GameContext)

  const onSubmit = () => {
    console.log('submitting')
  }

  return (
    <div className="submit-area">
      <div className="status-text">{isValidText || " "}</div>
      <button className="clear-button" onClick={onClear}>Clear</button>
      {isPlayingCampaignGame && (
        <button className="submit-button" onClick={onSubmit} disabled={!isValidWord}>Submit and Next Game</button>
      )}
    </div>
  )
})