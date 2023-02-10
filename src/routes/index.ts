import express from 'express'

import { getAppData } from './getAppData'

const router = express.Router()

router.get('/start', getAppData)

export default router

