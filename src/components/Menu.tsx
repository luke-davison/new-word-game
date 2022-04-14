import './Menu.css';

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';

import { AppContext } from '../stores/AppContext';
import { CalendarPopup } from './CalendarPopup';
import { CampaignGame } from './CampaignGame';
import { Game } from './Game';

export const Menu: React.FC = observer(() => {
  const { startCampaignGame, isShowingCalendar, isPlayingCampaignGame, toggleIsShowingCalendar ,dailyGameInProgress, isDevMode, toggleDevMode, isPlayingDailyGame, isPlayingRandomGame, returnToMenu, startDailyGame, startRandomGame, goToNextDailyGame, goToPreviousDailyGame } = useContext(AppContext)

  useEffect(() => {
    const listener = (event: globalThis.KeyboardEvent) => {
      if (event.key === "F3") {
        toggleDevMode()
      }
    }

    document.body.addEventListener('keydown', listener);
    return () => document.body.removeEventListener('keydown', listener)
  }, [])

  
  const today = new Date();
  const weekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
  const isTodaysGame = today.getFullYear() === dailyGameInProgress?.getFullYear() && today.getMonth() === dailyGameInProgress?.getMonth() && today.getDate() === dailyGameInProgress?.getDate() 
  const isWeekAgo  = today.getFullYear() === dailyGameInProgress?.getFullYear() && weekAgo.getMonth() === dailyGameInProgress?.getMonth() && weekAgo.getDate() === dailyGameInProgress?.getDate() 

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
          { isPlayingDailyGame && (
            <>
              {(!isWeekAgo || isDevMode) && <button onClick={goToPreviousDailyGame}>Previous</button>}
              {(!isTodaysGame || isDevMode) && <button onClick={goToNextDailyGame}>Next</button>}
            </>
          )}
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
    </div>
  );
})


