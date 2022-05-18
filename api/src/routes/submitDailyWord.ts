import { Request, Response } from 'express';

import { IGameStats, ISubmitWord } from '../../../src/shared/datamodels';
import { getWordPoints } from '../../../src/shared/utils/getWordPoints';
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

  const letters = convertWordToLetters(body.word, dailyGame, undefined)
  const points = getWordPoints(letters)

  const user = await db.getOrCreateUser(body.userId)

  let gameStats: IGameStats

  if (user.lastDailyGameSubmit === body.date) {
    gameStats = await db.submitGameStats(body.date, points, user.lastDailyGameSubmitScore)
  } else {
    gameStats = await db.submitGameStats(body.date, points)
    user.previousDailyGameSubmit = user.lastDailyGameSubmit
    user.lastDailyGameSubmit = body.date
  }

  user.lastDailyGameSubmitScore = points

  await db.updateUser(user)

  response.status(200).json(gameStats)
}
