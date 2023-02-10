import './styles/Game.css'

import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import { AppContext } from '../../../stores/AppContext'
import { GameContext } from '../../../stores/GameContext'
import { GameStore } from '../../../stores/GameStore'
import { GameArea } from './GameArea'
import { PageButtons } from './PageButtons'
import { AppTitle } from '../../menu/AppTitle'
import { DragPreviewLayer } from './DragPreviewLayer'

export const Game: React.FC = observer(() => {
  const appStore = useContext(AppContext)
  const [gameStore] = useState<GameStore>(new GameStore(appStore))
  
  const backend = isMobile ? TouchBackend : HTML5Backend

  return (
    <GameContext.Provider value={gameStore}>
      <DndProvider backend={backend}>
        <DragPreviewLayer/>
        <div className="game-container">
          <div className="game-container-title">
            <AppTitle/>
          </div>
          <div className="game-container-inner">
            <GameArea/>
            <PageButtons/>
          </div>
        </div>
      </DndProvider>
    </GameContext.Provider>
  )
})