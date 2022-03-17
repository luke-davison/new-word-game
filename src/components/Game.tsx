import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { GameContext } from '../stores/GameContext';
import { GameStore } from '../stores/GameStore';
import { GameArea } from './GameArea';

export const Game: React.FC = observer(() => {
  const [gameStore] = useState<GameStore>(new GameStore())

  return (
    <GameContext.Provider value={gameStore}>
      <DndProvider backend={HTML5Backend}>
        <GameArea/>
      </DndProvider>
    </GameContext.Provider>
  )
})