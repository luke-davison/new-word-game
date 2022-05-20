import './styles/Menu.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../../stores/AppContext';
import { Game } from '../game/Game';
import { Graph } from '../general/Graph';
import { IGameStats } from '../../shared';
import { AppTitle } from './AppTitle';

const dummyStats: IGameStats = {
  date: "2022-05-18",
  results: [[10, 1], [15, 3], [16, 4], [18, 2], [19, 5], [20, 7], [21, 11], [22, 5], [24, 16], [25, 21], [26, 28], [27, 10], [28, 21], [29, 60], [30, 72], [31, 130]]
}

export const Menu: React.FC = observer(() => {
  const { startCampaignGame, isPlayingCampaignGame, isPlayingDailyGame, startDailyGame, startTutorialGame, isPlayingTutorialGame, gameId, togglePreviousGamesMenu, isPreviousGamesMenuOpen } = useContext(AppContext)

  if (isPreviousGamesMenuOpen) {
    return (
      <div/>
    )
  }


  if (isPlayingCampaignGame || isPlayingTutorialGame || isPlayingDailyGame) {
    return (
      <Game key={gameId}/>
    )
  }

  return (
    <div className="game-container menu-buttons">
      <AppTitle/>
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
      <div>
        <button onClick={togglePreviousGamesMenu}>Previous games</button>
      </div>
      <Graph stats={dummyStats} selected={29}/>
    </div>
  );
})


