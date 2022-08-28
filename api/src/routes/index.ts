import express from 'express'

import { checkSubmitWord } from '../middleware/checkSubmitWord'
import { getAppData } from './getAppData'
import { submitCampaignWord } from './submitCampaignWord'
import { submitDailyWord } from './submitDailyWord'

const router = express.Router()

router.get("/start", getAppData)

router.route("/submit/weekly").post(
  checkSubmitWord,
  submitCampaignWord
)

router.route("/submit/daily").post(
  checkSubmitWord,
  submitDailyWord
)

export default router

