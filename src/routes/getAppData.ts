import { Request, Response } from 'express'

import { IAppData } from '../../client/src/shared/datamodels'
import { getCampaignGame } from '../games/getCampaignGame'
import { getDailyGame } from '../games/getDailyGame'
import { getTodayDateString } from '../utils/getTodayDateString'

export const getAppData = async (request: Request<{}, {}, {}, { userId?: string }>, response: Response) => {
  const date = getTodayDateString()

  const dailyGame = getDailyGame(date);
  const campaignGame = getCampaignGame(date)

  if (!dailyGame) {
    return response.status(500).send('Could not load data - unable to find daily game')
  }

  if (!campaignGame) {
    return response.status(500).send('Could not load data - unable to find campaign game')
  }

  const appData: IAppData = {
    date,
    dailyGame,
    campaignGame
  }

  response.json(appData)
}
