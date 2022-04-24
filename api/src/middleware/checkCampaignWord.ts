import { Request, Response, NextFunction } from "express"
import { ISubmitCampaignWord } from "../../../common/datamodels"
import { getDateFromString } from "../../../common/utils"

export const checkCampaignWord = (request: Request<{}, {}, ISubmitCampaignWord>, response: Response, next: NextFunction) => {
  const message = getCheckCampaignWordError(request.body)

  if (message) {
    return response.status(400).send(message)
  }

  return next()
}

export const getCheckCampaignWordError = (body: ISubmitCampaignWord): string | undefined => {
  const wordIsArray = Array.isArray(body.word)
  if (!wordIsArray) {
    return "Unable to validate - invalid word"
  }

  let isLetterError: boolean = false

  body.word.forEach(letter => {
    if (!letter || typeof letter !== "object") {
      isLetterError = true
      return
    }

    if (!letter.id || typeof letter.id !== "string") {
      isLetterError = true
      return
    }

    if (!letter.char || typeof letter.char !== "string") {
      isLetterError = true
      return
    }
  })

  if (isLetterError) {
    return "Unable to validate - invalid letter"
  }

  const hasUserId = body.userId && typeof body.userId === "string"
  if (!hasUserId) {
    return "Unable to validate - no user"
  }

  const hasDate = body.date && typeof body.date === "string"
  if (!hasDate) {
    return "Unable to validate - no date"
  }

  const dateFromString = getDateFromString(body.date)
  const today = new Date();

  if (dateFromString.getFullYear() !== today.getFullYear() || dateFromString.getMonth() !== today.getMonth() || dateFromString.getDate() !== today.getDate()) {
    return "Unable to validate - date does not match"
  }

  return undefined
}