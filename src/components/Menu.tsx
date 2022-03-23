import './Menu.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { Game } from './Game';

export const Menu: React.FC = observer(() => {
  const { isPlayingDailyGame, isPlayingRandomGame, returnToMenu, startDailyGame, startRandomGame, goToNextDailyGame, goToPreviousDailyGame } = useContext(AppContext)

  if (isPlayingDailyGame || isPlayingRandomGame) {
    return (
      <div className="game-container">
        <Game/>
        <div>
          <button onClick={returnToMenu}>Return to menu</button>
          { isPlayingDailyGame && (
            <>
              <button onClick={goToNextDailyGame}>Next</button>
              <button onClick={goToPreviousDailyGame}>Previous</button>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="game-container">
      <div>
        <button onClick={startDailyGame}>Daily game</button>
      </div>
      <div>
        <button onClick={startRandomGame}>Random game</button>
      </div>
    </div>
  );
})


