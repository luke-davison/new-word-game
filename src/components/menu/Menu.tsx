import './styles/Menu.css'

import { observer } from 'mobx-react-lite'
import { FunctionComponent, useContext } from 'react'

import { AppContext } from '../../stores/AppContext'
import { Game } from '../game/general/Game'
import { MenuWrapper } from './MenuWrapper'
import { PreviousGamesMenu } from './PreviousGamesMenu'

export const Menu: FunctionComponent = observer(() => {
  const { startCampaignGame, isPlayingCampaignGame, isPlayingDailyGame, startDailyGame, startTutorialGame, isPlayingTutorialGame, gameId, openPreviousGamesMenu, isPreviousGamesMenuOpen, isPlayingPreviousGame } = useContext(AppContext)

  if (isPreviousGamesMenuOpen) {
    return (
      <PreviousGamesMenu/>
    )
  }

  if (isPlayingCampaignGame || isPlayingTutorialGame || isPlayingDailyGame || isPlayingPreviousGame) {
    return (
      <Game key={gameId}/>
    )
  }

  return (
    <MenuWrapper>
      <div className="game-description">
        <div>The daily game of buying and arranging letters.</div>
        <div>Just like the lettersmiths of old.</div>
      </div>
      <div className="menu-buttons">
        <div>
          <button onClick={startDailyGame}>Daily game</button>
        </div>
        <div>
          <button onClick={startCampaignGame}>Campaign game</button>
        </div>
        <div>
          <button onClick={startTutorialGame}>Tutorial</button>
        </div>
        <div>
          <button onClick={openPreviousGamesMenu}>Previous games</button>
        </div>
      </div>
    </MenuWrapper>
  )
})


