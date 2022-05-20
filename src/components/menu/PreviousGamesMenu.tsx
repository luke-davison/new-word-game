import { observer } from 'mobx-react-lite';
import { FunctionComponent, useEffect, useState } from 'react';
import { IDailyGame } from '../../shared';
import { loadCachedGames } from '../../utils/loadCachedGames';
import { Calendar } from '../general/Calendar';

import { MenuWrapper } from './MenuWrapper';

export const PreviousGamesMenu: FunctionComponent = observer(() => {

  const [games, setGames] = useState<IDailyGame[]>()

  useEffect(() => {
    const gamesFromCache = loadCachedGames()
    setGames(gamesFromCache)
  }, [])

  return (
    <MenuWrapper>
      <Calendar startDate={new Date()} minDate={new Date(2022, 1, 1)} maxDate={new Date(2022, 5, 20)}/>
    </MenuWrapper>
  );
})
