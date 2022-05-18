import './Menu.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { Game } from './Game';

export const Menu: React.FC = observer(() => {
  const { startCampaignGame, isPlayingCampaignGame, isPlayingDailyGame, startDailyGame, startTutorialGame, isPlayingTutorialGame, gameId } = useContext(AppContext)

  console.log(gameId)
  if (isPlayingCampaignGame || isPlayingTutorialGame || isPlayingDailyGame) {
    return (
      <Game key={gameId}/>
    )
  }

  return (
    <div className="game-container menu-buttons">
      <div className="game-title">
        Lettermonger
      </div>
      <div className="game-description">
        <div>The daily game of buying and arranging letters.</div>
        <div>Just like the wordsmiths of old.</div>
      </div>
      <div>
        <button onClick={startDailyGame}>Daily game</button>
      </div>
      <div>
        <button onClick={startCampaignGame}>Campaign game</button>
      </div>
      <div>
        <button onClick={startTutorialGame}>Tutorial</button>
      </div>
    </div>
  );
})


