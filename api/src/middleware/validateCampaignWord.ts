import { ICampaignGame, IPlayer, ISubmitCampaignWord } from "../../../common/datamodels"
import { getIsWordInWordlist } from "../../../common/utils"
import { Abilities } from "../../../common/enums"
import { convertWordToLetters } from "../utils/convertWordToLetters"

export const validateCampaignWord = (body: ISubmitCampaignWord, campaignGame: ICampaignGame, player: IPlayer | undefined): string | undefined => {
  const letters = convertWordToLetters(body.word, campaignGame, player)

  if (letters.length !== body.word.length) {
    return "Unable to validate - letter not available or could not find letter"
  }

  let isLetterIncorrect = false

  letters.forEach((letter, index) => {
    const { char } = body.word[index]
    if (letter.char !== char && letter.ability !== Abilities.Wild) {
      isLetterIncorrect = true
    }
  
    if (letter.ability === Abilities.Wild && char.length > 1) {
      isLetterIncorrect = true
    }
  })

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

  if (player?.inventory) {
    let inventoryLetterUsedMultipleTimes = false
  
    player.inventory.forEach(inventoryLetter => {
      const timesLetterUsed = body.word.filter(letter => inventoryLetter.id === letter.id).length
      if (timesLetterUsed > 1) {
        inventoryLetterUsedMultipleTimes = true
      }
    })
  
    if (inventoryLetterUsedMultipleTimes) {
      return "Unable to validate - inventory letter used more than once"
    }
  }

  const isValidWord = getIsWordInWordlist(body.word.map(letter => letter.char).join(""))
  if (!isValidWord) {
    return "Unable to validate - word is not in wordlist"
  }

  return undefined
}