import './GameButtons.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { CampaignContext } from '../stores/CampaignContext';
import { GameContext } from '../stores/GameContext';
import { getBestWords } from '../utils/getBestWords';

export const GameButtons: React.FC = observer(() => {
  const { isDevMode } = useContext(AppContext)
  const campaignStore = useContext(CampaignContext)
  const { game, playerWord, money, onClear, isValidText, isValidWord } = useContext(GameContext)

  const onSubmit = () => {
    campaignStore.onSubmit(playerWord, money)
  }

  return (
    <div className="submit-area">
      <div className="status-text">{isValidText || " "}</div>
      <button className="clear-button" onClick={onClear}>Clear</button>
      {campaignStore && (
        <button className="submit-button" onClick={onSubmit} disabled={!isValidWord}>Submit and Next Game</button>
      )}
      {isDevMode && <button onClick={() => getBestWords(game!)}>Compute possibilities</button>}
    </div>
  )
})