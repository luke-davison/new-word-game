import express from 'express';

import { getDailyGame } from '../games/getDailyGame';

const router = express.Router()

router.get("/daily-game", (request, response) => {
  const today = new Date()
  const dailyGame = getDailyGame(today)
  response.json(JSON.stringify(dailyGame))
})

export default router

