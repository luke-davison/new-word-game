import './Menu.css';

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { CalendarPopup } from './CalendarPopup';
import { Game } from './Game';

export const Menu: React.FC = observer(() => {
  const { startCampaignGame, isShowingCalendar, isPlayingCampaignGame, toggleIsShowingCalendar, isPlayingDailyGame, returnToMenu, startDailyGame } = useContext(AppContext)

  if (isPlayingCampaignGame) {
    return (
      <div className="game-container">
        <Game/>
        <div className="page-buttons">
          <button onClick={returnToMenu}>Quit</button>
        </div>
      </div>
    )
  }

  if (isPlayingDailyGame) {
    return (
      <div className="game-container">
        <Game/>
        <div className="page-buttons">
          <button onClick={returnToMenu}>Return to menu</button>
          <button onClick={toggleIsShowingCalendar}>Calendar</button>
        </div>
        {isShowingCalendar && (
          <CalendarPopup onClose={toggleIsShowingCalendar}/>
        )}
      </div>
    )
  }

  return (
    <div className="game-container menu-buttons">
      <div className="game-title">
        Lettermonger
      </div>
      <div>
        <button onClick={startDailyGame}>Daily game</button>
      </div>
      <div>
        <button onClick={startCampaignGame}>Campaign game</button>
      </div>
    </div>
  );
})


