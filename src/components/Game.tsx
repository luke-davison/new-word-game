import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { AppContext } from '../stores/AppContext';
import { CampaignContext } from '../stores/CampaignContext';
import { GameContext } from '../stores/GameContext';
import { GameStore } from '../stores/GameStore';
import { GameArea } from './GameArea';

export const Game: React.FC = observer(() => {
  const appStore = useContext(AppContext)
  const { today } = appStore
  const campaignStore = useContext(CampaignContext)

  const [gameStore, setGameStore] = useState<GameStore | undefined>()

  useEffect(() => {
    setGameStore(new GameStore({ appStore, campaignStore }))
  }, [today, campaignStore.campaignId, campaignStore.campaignDay])
  
  const backend = isMobile ? TouchBackend : HTML5Backend

  if (!gameStore) {
    return null
  }

  return (
    <GameContext.Provider key={today.toISOString()} value={gameStore}>
      <DndProvider backend={backend}>
        <GameArea/>
      </DndProvider>
    </GameContext.Provider>
  )
})