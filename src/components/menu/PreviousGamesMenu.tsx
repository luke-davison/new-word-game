import './styles/PreviousGamesMenu.css';

import { observer } from 'mobx-react-lite';
import { FunctionComponent, useContext, useEffect, useState } from 'react';

import { getDateFromString, getDateString } from '../../shared';
import { AppContext } from '../../stores/AppContext';
import { loadCachedGameData } from '../../utils/loadCachedGameData';
import { Calendar } from '../general/Calendar';
import { MenuWrapper } from './MenuWrapper';

export const PreviousGamesMenu: FunctionComponent = observer(() => {
  const { dateString, startPreviousGame, returnToMenu, startDailyGame, cachedGames } = useContext(AppContext)

  const [dates, setDates] = useState<string[]>([])

  useEffect(() => {
    const cachedGameData = loadCachedGameData()
    if (cachedGameData) {
      setDates(cachedGameData.dates)
    }
  }, [])

  const earliestGame = dates.length > 0 ? cachedGames.get(dates[0]) : undefined
  const latestGame = dates.length > 0 ? cachedGames.get(dates[dates.length - 1]) : undefined

  const renderDate = (date: Date) => {
    const game = cachedGames.get(getDateString(date))

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
      { dates.length > 1 ? (
        <Calendar
          startDate={new Date()}
          minDate={earliestGame ? getDateFromString(earliestGame.date) : new Date()}
          maxDate={latestGame ? getDateFromString(latestGame.date) : new Date()}
          renderDate={renderDate}
        />
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
  );
})
