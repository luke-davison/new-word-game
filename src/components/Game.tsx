import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { AppContext } from '../stores/AppContext';
import { GameContext } from '../stores/GameContext';
import { GameStore } from '../stores/GameStore';
import { getDailyGame } from '../utils/getDailyGame';
import { GameArea } from './GameArea';

export const Game: React.FC = observer(() => {
  const appStore = useContext(AppContext)
  const { isPlayingDailyGame, dailyGameInProgress } = appStore

  const [gameStore, setGameStore] = useState<GameStore | undefined>()

  useEffect(() => {
    setGameStore(new GameStore(appStore, isPlayingDailyGame ? getDailyGame(dailyGameInProgress) : undefined))
  }, [dailyGameInProgress])
  
  const backend = isMobile ? TouchBackend : HTML5Backend

  if (!gameStore) {
    return null
  }

  return (
    <GameContext.Provider key={dailyGameInProgress?.toISOString()} value={gameStore}>
      <DndProvider backend={backend}>
        <GameArea/>
      </DndProvider>
    </GameContext.Provider>
  )
})