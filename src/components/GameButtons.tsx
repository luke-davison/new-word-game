import './GameButtons.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { CampaignContext } from '../stores/CampaignContext';
import { GameContext } from '../stores/GameContext';

export const GameButtons: React.FC = observer(() => {
  const campaignStore = useContext(CampaignContext)
  const { playerWord, wordPoints, onClear, isValidText, isValidWord } = useContext(GameContext)

  const onSubmit = () => {
    campaignStore.onSubmit(playerWord, wordPoints)
  }

  return (
    <div className="submit-area">
      <div className="status-text">{isValidText || " "}</div>
      <button className="clear-button" onClick={onClear}>Clear</button>
      {campaignStore && (
        <button className="submit-button" onClick={onSubmit} disabled={!isValidWord}>Submit and Next Game</button>
      )}
    </div>
  )
})