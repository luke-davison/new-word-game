import { Request, Response } from 'express';

import { ISubmitWord } from '../../../shared/datamodels';
import { getWordPoints } from '../../../shared/utils/getWordPoints';
import { db } from '../db';
import { validateSubmitWord } from '../middleware/validateSubmitWord';
import { convertWordToLetters } from '../utils/convertWordToLetters';

export const submitDailyWord = async (request: Request<{}, {}, ISubmitWord>, response: Response) => {
  const { body } = request
  const dailyGame = await db.getDailyGame(request.body.date)

  if (!dailyGame) {
    return response.status(400).send("Unable to validate - game not found")
  }

  const message = validateSubmitWord(request.body, dailyGame, undefined)

  if (message) {
    return response.status(400).send(message)
  }

  const user = await db.getUser(body.userId)
  if (user) {
    user.previousDailyGameSubmit = user.lastDailyGameSubmit
    user.lastDailyGameSubmit = body.date
    await db.updateUser(user)
  } else {
    return response.status(400).send("Unable to validate - unknown user")
  }

  const letters = convertWordToLetters(body.word, dailyGame, undefined)
  const points = getWordPoints(letters)

  const gameStats = await db.submitGameStats(body.date, points)

  response.status(200).json(gameStats)
}
