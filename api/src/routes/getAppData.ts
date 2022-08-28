import { Request, Response } from 'express';

import { IAppData, IGameStats } from '../../../src/shared/datamodels';
import { db } from '../db';
import { getTodayDateString } from '../utils/getTodayDateString';

export const getAppData = async (request: Request<{}, {}, {}, { userId?: string }>, response: Response) => {
  const date = getTodayDateString()

  const [dailyGame, campaignGame, player, user] = await Promise.all([
    db.getDailyGame(date),
    db.getCampaignGame(date),
    request.query.userId ? await db.getPlayer(request.query.userId, date) : undefined,
    request.query.userId ? await db.getUser(request.query.userId) : undefined
  ])

  if (!dailyGame) {
    return response.status(500).send("Could not load data - unable to find daily game")
  }

  if (!campaignGame) {
    return response.status(500).send("Could not load data - unable to find campaign game")
  }

  let currentDailyGameStats: IGameStats | undefined = undefined
  let previousDailyGameDate: string | undefined = undefined
  let previousDailyGameStats: IGameStats | undefined = undefined

  if (user?.lastDailyGameSubmit) {
    if (user.lastDailyGameSubmit === date) {
      currentDailyGameStats = await db.getGameStats(user.lastDailyGameSubmit)
      if (user.previousDailyGameSubmit) {
        previousDailyGameDate = user.previousDailyGameSubmit
        previousDailyGameStats = await db.getGameStats(user.previousDailyGameSubmit)
      }
    } else {
      previousDailyGameStats = await db.getGameStats(user.lastDailyGameSubmit)
    }
  }

  const userId = request.query.userId || String(Math.random()).slice(2)

  const appData: IAppData = {
    date,
    userId,
    dailyGame,
    campaignGame,
    player,
    currentDailyGameStats,
    previousDailyGameDate,
    previousDailyGameStats
  }

  response.json(appData)
}

export const getGameStats = async (userId: string | undefined): Promise<{ currentGameStats?: IGameStats, previousGameStats?: IGameStats }> => {
  if (!userId) {
    return {}
  }

  const user = await db.getUser(userId)

  const date = getTodayDateString()

  const currentGameDate = user?.lastDailyGameSubmit === date
    ? user?.lastDailyGameSubmit
    : undefined

  const previousGameDate = user?.lastDailyGameSubmit === date
    ? user?.previousDailyGameSubmit
    : user?.lastDailyGameSubmit

  const [currentGameStats, previousGameStats] = await Promise.all([
    currentGameDate ? db.getGameStats(currentGameDate) : undefined,
    previousGameDate ? db.getGameStats(previousGameDate) : undefined
  ])

  return { currentGameStats, previousGameStats }
}
