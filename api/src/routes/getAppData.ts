import { Request, Response } from 'express';

import { IAppData } from '../../../common/datamodels';
import { getDateString } from '../../../common/utils';
import { db } from '../db';

export const getAppData = async (request: Request<{}, {}, {}, { userId?: string }>, response: Response) => {
  const today = getDateString(new Date())

  const [dailyGame, campaignGame, player] = await Promise.all([
    db.getDailyGame(today),
    db.getCampaignGame(today),
    request.query.userId ? await db.getPlayer(request.query.userId, today) : undefined
  ])

  if (!dailyGame) {
    return response.status(500).send("Could not load data - unable to find daily game")
  }

  if (!campaignGame) {
    return response.status(500).send("Could not load data - unable to find campaign game")
  }

  const userId = request.query.userId || String(Math.random()).slice(2)

  const appData: IAppData = {
    userId,
    dailyGame,
    campaignGame,
    player
  }

  response.json(appData)
}
