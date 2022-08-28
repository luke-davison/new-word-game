import './styles/PreviousGamesMenu.css'

import { observer } from 'mobx-react-lite'
import { FunctionComponent, useContext, useEffect } from 'react'

import { getDateFromString, getDateString } from '../../shared'
import { AppContext } from '../../stores/AppContext'
import { Calendar } from '../general/Calendar'
import { MenuWrapper } from './MenuWrapper'
import { PreviousGamesMenuKey } from './PreviousGamesMenuKey'

export const PreviousGamesMenu: FunctionComponent = observer(() => {
  const { dateString, startPreviousGame, returnToMenu, startDailyGame, cachedGameDates = [], cachedGames, cachedScores,  loadCachedGameData } = useContext(AppContext)

  useEffect(() => {
    loadCachedGameData()
  }, [loadCachedGameData])

  const earliestGame = cachedGameDates.length > 0 ? cachedGames.get(cachedGameDates[0]) : undefined
  const latestGame = cachedGameDates.length > 0 ? cachedGames.get(cachedGameDates[cachedGameDates.length - 1]) : undefined

  const renderDate = (date: Date) => {
    const gameDateString = getDateString(date)
    const game = cachedGames.get(gameDateString)

    if (game) {
      const onClick = () => {
        if (game.date === dateString) {
          startDailyGame()
        } else {
          startPreviousGame(game)
        }
      }

      let className: string = "game-link"

      if (game.date === dateString) {
        className += " current-game"
      } else {
        className += " previous-game"
      }

      const points = cachedScores.get(gameDateString) || 0

      if (points >= game.secretTarget) {
        className += " met-secret-target"
      } else if (points >= game.target) {
        className += " met-target"
      }

      return (
        <div onClick={onClick} className={className}>
          {date.getDate()}
        </div>
      )
    }

    return (
      <div>
        {date.getDate()}
      </div>
    )
  }

  return (
    <MenuWrapper>
      { cachedGameDates.length > 1 ? (
        <div>
          <Calendar
            startDate={new Date()}
            minDate={earliestGame ? getDateFromString(earliestGame.date) : new Date()}
            maxDate={latestGame ? getDateFromString(latestGame.date) : new Date()}
            renderDate={renderDate}
          />
          <PreviousGamesMenuKey/>
        </div>
      ): (
        <div>
          <div>
            Looks like this is your first day.
          </div>
          <div>
            Return back here in the future to view past results and revisit games that you feel like you could improve on.
          </div>
        </div>
      )}
      <div>
        <button onClick={returnToMenu}>Return to Menu</button>
      </div>
    </MenuWrapper>
  )
})
