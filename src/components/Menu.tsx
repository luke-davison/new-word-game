import './Menu.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { Game } from './Game';
import { Graph } from './Graph';
import { IGameStats } from '../shared';

const dummyStats: IGameStats = {
  date: "2022-05-18",
  results: [[10, 1], [15, 3], [16, 4], [18, 2], [19, 5], [20, 7], [21, 11], [22, 5], [24, 16], [25, 21], [26, 28], [27, 10], [28, 21], [29, 60], [30, 72], [31, 130]]
}

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
      <Graph stats={dummyStats}/>
    </div>
  );
})


