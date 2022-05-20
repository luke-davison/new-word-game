import './styles/PreviousGamesMenu.css';

import { observer } from 'mobx-react-lite';
import { FunctionComponent, useContext, useEffect, useState } from 'react';

import { getDateFromString, getDateString, IDailyGame } from '../../shared';
import { AppContext } from '../../stores/AppContext';
import { loadCachedGames } from '../../utils/loadCachedGames';
import { Calendar } from '../general/Calendar';
import { MenuWrapper } from './MenuWrapper';

export const PreviousGamesMenu: FunctionComponent = observer(() => {
  const { dateString, startPreviousGame, returnToMenu } = useContext(AppContext)

  const [games, setGames] = useState<IDailyGame[]>([])

  useEffect(() => {
    const gamesFromCache = loadCachedGames()
    setGames(gamesFromCache)
  }, [])

  const earliestGame = games.length > 0 ? games[0] : undefined
  const latestGame = games.length > 0 ? games[games.length - 1] : undefined

  const renderDate = (date: Date) => {
    const game = games.find(game => game.date === getDateString(date))

    if (game && game.date !== dateString) {
      const onClick = () => {
        startPreviousGame(game)
      }

      const className: string = "previous-game-link"

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
      { games.length > 1 ? (
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