import { ISubmitCampaignWord } from "../../../common/datamodels";
import { Database } from "../db/Database";
import { Request, Response } from "express"
import { db } from "../db"
import { validateCampaignWord } from "../middleware/validateCampaignWord";
import { convertWordToLetters } from "../utils/convertWordToLetters";

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

  const letters = convertWordToLetters(body.word, campaignGame, player)


}

export const submitCampaignGame = async (body: ISubmitCampaignWord, db: Database) => {



  // increase score

  // increase funding

  // retain letters

  // 
}