import { Request, Response, NextFunction } from "express"
import { ILetter, ISubmitCampaignWord } from "../../../common/datamodels"
import { Database } from "../db/Database"
import { db } from "../db/Database"
import { getIsWordInWordlist } from "../../../common/utils"
import { Abilities } from "../../../common/enums"

export const validateCampaignWord = (request: Request<{}, {}, ISubmitCampaignWord>, response: Response, next: NextFunction) => {
  const message = getValidateCampaignWordError(request.body, db)

  if (message) {
    return response.status(400).send(message)
  }

  return next()
}

export const getValidateCampaignWordError = async (body: ISubmitCampaignWord, db: Database): Promise<string | undefined> => {
  const campaignGame = await db.getCampaignGame(body.date)

  if (!campaignGame) {
    return "Unable to validate - could not find game"
  }

  const player = await db.getPlayer(body.userId, body.date)

  const inventory: ILetter[] = player?.inventory || []
  const memberLetters: ILetter[] = player?.isMember ? campaignGame.memberLetters : []
  const availableLetters = [...campaignGame.letters, ...inventory, ...memberLetters]

  let isLetterMissing = false
  let isLetterIncorrect = false

  const letters = body.word.map(letter => {
    const matchingLetter = availableLetters.find(availableLetter => letter.id === availableLetter.id)
    if (!matchingLetter) {
      isLetterMissing = true
      return undefined
    }

    if (matchingLetter.char !== letter.char && matchingLetter.ability !== Abilities.Wild) {
      isLetterIncorrect = true
    }

    if (matchingLetter.ability === Abilities.Wild && letter.char.length > 1) {
      isLetterIncorrect = true
    }

    return matchingLetter
  })

  if (isLetterMissing) {
    return "Unable to validate - letter not available or could not find letter"
  }

  if (isLetterIncorrect) {
    return "Unable to validate - letter character is incorrect"
  }

  const money = campaignGame.money + (player?.funding || 0)

  const moneyUsed = letters.reduce((sum, letter) => {
    return sum + letter!.price
  }, 0)

  if (moneyUsed > money) {
    return "Unable to validate - insufficient money"
  }

  let inventoryLetterUsedMultipleTimes = false

  inventory.forEach(inventoryLetter => {
    const timesLetterUsed = body.word.filter(letter => inventoryLetter.id === letter.id).length
    if (timesLetterUsed > 1) {
      inventoryLetterUsedMultipleTimes = true
    }
  })

  if (inventoryLetterUsedMultipleTimes) {
    return "Unable to validate - inventory letter used more than once"
  }

  const isValidWord = getIsWordInWordlist(body.word.map(letter => letter.char).join(""))
  if (!isValidWord) {
    return "Unable to validate - word is not in wordlist"
  }

  return undefined
}