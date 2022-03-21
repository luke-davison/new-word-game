import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { Game } from './Game';

export const Menu: React.FC = observer(() => {
  const { isPlayingDailyGame, isPlayingRandomGame, returnToMenu, startDailyGame, startRandomGame } = useContext(AppContext)

  if (isPlayingDailyGame || isPlayingRandomGame) {
    return (
      <>
        <Game/>
        <div>
          <button onClick={returnToMenu}>Return to menu</button>
        </div>
      </>
    )
  }

  return (
    <div className="menu">
      <div>
        <button onClick={startDailyGame}>Daily game</button>
      </div>
      <div>
        <button onClick={startRandomGame}>Random game</button>
      </div>
    </div>
  );
})


