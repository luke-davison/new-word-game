import express, { Request } from 'express';
import { IAppData, ISubmitCampaignWord } from '../../../common/datamodels';

import { Database } from '../db/Database';
import { FakeDatabaseConnection } from '../db/FakeDatabaseConnection';
import { getCampaignGame } from '../games/getCampaignGame';

import { getDailyGame } from '../games/getDailyGame';

const router = express.Router()

const database = new Database(new FakeDatabaseConnection())

router.get("/start", async (request: Request<{}, {}, {}, { userId: string }>, response) => {
  const today = new Date()
  const dailyGame = getDailyGame(today)
  if (!dailyGame) {
    return response.status(500).send("Could not load data - unable to find daily game")
  }

  const campaignGame = getCampaignGame(today)
  if (!campaignGame) {
    return response.status(500).send("Could not load data - unable to find campaign game")
  }

  const player = await database.getOrCreatePlayer(request.query.userId, campaignGame.date)
  const appData: IAppData = {
    dailyGame,
    campaignGame,
    player
  }
  response.json(appData)
})

router.post("/submit", async (request: Request<{}, {}, { body: ISubmitCampaignWord }>, response) => {
  const { body } = request.body
})

export default router

