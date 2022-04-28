import express, { Request } from 'express';

import { IAppData } from '../../../common/datamodels';
import { getDateString } from '../../../common/utils';
import { db } from '../db';
import { getCampaignGame } from '../games/getCampaignGame';
import { getDailyGame } from '../games/getDailyGame';
import { checkSubmitWord } from '../middleware/checkSubmitWord';
import { submitCampaignWord } from './submitCampaignWord';

const router = express.Router()

router.get("/start", async (request: Request<{}, {}, {}, { userId: string }>, response) => {
  const today = getDateString(new Date())
  const dailyGame = getDailyGame(today)
  if (!dailyGame) {
    return response.status(500).send("Could not load data - unable to find daily game")
  }

  const campaignGame = getCampaignGame(today)
  if (!campaignGame) {
    return response.status(500).send("Could not load data - unable to find campaign game")
  }

  const player = await db.getOrCreatePlayer(request.query.userId, campaignGame.date)
  const appData: IAppData = {
    dailyGame,
    campaignGame,
    player
  }

  response.json(appData)
})

router.route("/submit").post(
  checkSubmitWord,
  submitCampaignWord
)

export default router

