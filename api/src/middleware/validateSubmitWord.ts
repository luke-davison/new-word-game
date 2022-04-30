import { ICampaignGame, IDailyGame, IPlayer, ISubmitWord } from '../../../src/shared/datamodels';
import { Abilities } from '../../../src/shared/enums';
import { getDateFromString, getIsWordInWordlist } from '../../../src/shared/utils';
import { convertWordToLetters } from '../utils/convertWordToLetters';

export const validateSubmitWord = (body: ISubmitWord, game: ICampaignGame | IDailyGame, player: IPlayer | undefined): string | undefined => {

  if (player?.lastSubmit) {
    const gameDate = getDateFromString(game.date)
    const lastSubmitDate = getDateFromString(player.lastSubmit)

    if (gameDate <= lastSubmitDate) {
      return "Unable to validate - game already submitted"
    }
  }

  const letters = convertWordToLetters(body.word, game, player)

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

  const money = game.money + (player?.funding || 0)

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