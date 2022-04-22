import './Menu.css';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';

import { AppContext } from '../stores/AppContext';
import { CalendarPopup } from './CalendarPopup';
import { CampaignGame } from './CampaignGame';
import { DatePickerInput } from './DatePickerInput';
import { Game } from './Game';

export const Menu: React.FC = observer(() => {
  const { startCampaignGame, isShowingCalendar, isPlayingCampaignGame, toggleIsShowingCalendar, toggleDevMode, isPlayingDailyGame, isPlayingRandomGame, returnToMenu, startDailyGame, startRandomGame } = useContext(AppContext)

  useEffect(() => {
    const listener = (event: globalThis.KeyboardEvent) => {
      if (event.key === "F3") {
        toggleDevMode()
      }
    }

    document.body.addEventListener('keydown', listener);
    return () => document.body.removeEventListener('keydown', listener)
  }, [])

  if (isPlayingCampaignGame) {
    return (
      <div className="game-container">
        <CampaignGame/>
        <div className="page-buttons">
          <button onClick={returnToMenu}>Quit</button>
        </div>
      </div>
    )
  }

  if (isPlayingDailyGame || isPlayingRandomGame) {
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
      <div>
        <button onClick={startDailyGame}>Daily game</button>
      </div>
      <div>
        <button onClick={startCampaignGame}>Campaign game</button>
      </div>
      <div>
        <button onClick={startRandomGame}>Random game</button>
      </div>
      <DatePickerInput/>
    </div>
  );
})


