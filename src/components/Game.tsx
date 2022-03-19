import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { GameContext } from '../stores/GameContext';
import { GameStore } from '../stores/GameStore';
import { GameArea } from './GameArea';

export const Game: React.FC = observer(() => {
  const [gameStore] = useState<GameStore>(new GameStore())
  
  const backend = isMobile ? TouchBackend : HTML5Backend

  return (
    <GameContext.Provider value={gameStore}>
      <DndProvider backend={backend}>
        <GameArea/>
      </DndProvider>
    </GameContext.Provider>
  )
})