import { Request, Response } from 'express'

import { ISubmitWord } from '../../../src/shared/datamodels'
import { db } from '../db'
import { validateSubmitWord } from '../middleware/validateSubmitWord'
import { getPlayerAfterSubmit } from '../utils/getPlayerAfterSubmit'

export const submitCampaignWord = async (request: Request<{}, {}, ISubmitWord>, response: Response) => {
  const { body } = request
  const campaignGame = await db.getCampaignGame(request.body.date)

  if (!campaignGame) {
    return response.status(400).send('Unable to validate - game not found')
  }

  const player = await db.getPlayer(body.userId, body.date)

  const message = validateSubmitWord(request.body, campaignGame, player)

  if (message) {
    return response.status(400).send(message)
  }

  const newPlayer = getPlayerAfterSubmit(body, campaignGame, player)
  
  const newPlayerResult = await db.submitPlayer(newPlayer)

  response.status(200).json(newPlayerResult)
}
