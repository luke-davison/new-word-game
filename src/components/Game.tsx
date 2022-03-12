import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { GameContext } from '../stores/GameContext';
import { GameStore } from '../stores/GameStore';
import { getSampleGame } from '../utils/getSampleGame';
import { GameArea } from './GameArea';

export const Game: React.FC = observer(() => {
  const [gameStore] = useState<GameStore>(new GameStore(getSampleGame()))

  return (
    <GameContext.Provider value={gameStore}>
      <GameArea/>
    </GameContext.Provider>
  )
})