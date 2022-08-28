import { Abilities } from '../../../src/shared'
import { IGame, ILetter } from '../../../src/shared/datamodels'
import { Letter } from '../../../src/shared/models'
import { wordlist } from '../../../src/shared/utils'
import { getWordPoints } from '../../../src/shared/utils/getWordPoints'
import { setupLetters } from '../../../src/shared/utils/setupLetters'

export const getBestWords = (game: IGame, printScore: number) => {
  const map = new Map<number, number>()
  const words = new Map<number, string[]>()

  wordlist.forEach(word => {
    const points = calculateBestScoreForWord(game, word)
    // console.log(word, points)
    if (map.has(points)) {
      map.set(points, map.get(points)! + 1)
    } else {
      map.set(points, 1)
    }
    if (points >= printScore) {
      if (words.has(points)) {
        words.get(points)?.push(word)
      } else {
        words.set(points, [word])
      }
    }

  })
  const pointsArray = Array.from(map).sort((a, b) => a[0] - b[0])
  pointsArray.forEach(([points]) => {
    if (points >= printScore) {
      console.log()
      console.log(points)

      const wordsArray = words.get(points)
      wordsArray?.forEach(word => {
        console.log(word)
      })
    }
  })

  console.log()

  pointsArray.forEach(([points, num]) => {
    console.log(points, '-', num)
  })

  console.log()
}

export const calculateBestScoreForWord = (game: IGame, word: string): number => {
  const shop = setupLetters(game.letters)

  const letters = word.split('')

  const doThing = (wordSoFar: ILetter[], lettersRemaining: string[]): number => {
    const [nextLetter,  ...otherLetters] = lettersRemaining
    
    return shop.reduce((highestScore: number, shopLetter: Letter): number => {
      if (nextLetter !== shopLetter.char && shopLetter.ability !== Abilities.Wild) {
        return highestScore
      }

      const newLetter = shopLetter.ability === Abilities.Wild
        ? { ...shopLetter.data, char: nextLetter } as Letter
        : shopLetter

      const newWordSoFar = [...wordSoFar, newLetter]

      if (otherLetters.length === 0) {
        const spent = newWordSoFar.reduce((sum, letter) => sum + letter.price, 0)
        if (spent > game.money) {
          return highestScore
        }

        const score = getWordPoints(newWordSoFar)
        return Math.max(score, highestScore)
      }

      const thingScore = doThing(newWordSoFar, otherLetters)
      return Math.max(thingScore, highestScore)
    }, 0)
  }

  return doThing([], letters)
}
