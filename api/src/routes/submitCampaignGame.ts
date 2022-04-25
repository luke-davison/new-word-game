import { ISubmitCampaignWord } from "../../../common/datamodels";
import { Request, Response } from "express"
import { db } from "../db"
import { validateCampaignWord } from "../middleware/validateCampaignWord";
import { getPlayerAfterSubmit } from "../utils/getPlayerAfterSubmit";

export const submitCampaignWord = async (request: Request<{}, {}, ISubmitCampaignWord>, response: Response) => {
  const { body } = request
  const campaignGame = await db.getCampaignGame(request.body.date)

  if (!campaignGame) {
    return response.status(400).send("Unable to validate - game not found")
  }

  const player = await db.getPlayer(body.userId, body.date)

  const message = validateCampaignWord(request.body, campaignGame, player)

  if (message) {
    return response.status(400).send(message)
  }

  const newPlayer = getPlayerAfterSubmit(body, campaignGame, player)
  
  const newPlayerResult = await db.submitPlayer(newPlayer)

  response.status(200).json(newPlayerResult)
}
