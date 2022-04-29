import { IGame } from '../../../shared/datamodels';
import { Letter, LetterInstance } from '../../../shared/models';
import { getIsValidWord, getWildAbility, setupLetters, wordlist } from '../../../shared/utils';

export const getBestWords = (game: IGame) => {
  const map = new Map()
  const words: Array<{ word: string, points: number }> = []

  wordlist.forEach((word) => {
    const points = calculateBestScoreForWord(game, word)
    if (map.has(points)) {
      map.set(points, map.get(points) + 1)
    } else {
      map.set(points, 1)
    }
    console.log(word, points)
    if (points > 20) {
      words.push({ word, points })
    }
  })
  console.log(Array.from(map).sort((a, b) => b[0] - a[0]))
  console.log(Array.from(words).sort((a, b) => b.points - a.points))
}

export const calculateBestScoreForWord = (game: IGame, word: string): number => {
  const wild: Letter = new Letter({ color: 0, char: "", price: 1, points: 0, isWild: true, ability: getWildAbility() })

  const shop = setupLetters(game.letters)

  const letters = word.split("")

  const doThing = (wordSoFar: LetterInstance[], lettersRemaining: string[]): number => {
    const [nextLetter,  ...otherLetters] = lettersRemaining
    
    const scoreIfNotWild = shop.reduce((highestScore: number, shopLetter: Letter): number => {
      if (nextLetter !== shopLetter.char) {
        return highestScore
      }

      const newWordSoFar = [...wordSoFar, new LetterInstance(shopLetter, wordSoFar.length)]

      if (otherLetters.length === 0) {
        const score = scoreWord(newWordSoFar, game.money)
        return Math.max(score, highestScore)
      }

      const thingScore = doThing(newWordSoFar, otherLetters)
      return Math.max(thingScore, highestScore)
    }, 0)

    const wildInstance = new LetterInstance(wild, wordSoFar.length)
    wildInstance.setWildLetter(nextLetter)
    const newWordSoFar: LetterInstance[] = [...wordSoFar, wildInstance]

    if (otherLetters.length === 0) {
      const score = scoreWord(newWordSoFar, game.money)
      return Math.max(score, scoreIfNotWild)
    }

    const scoreIfWild = doThing(newWordSoFar, otherLetters)
    return Math.max(scoreIfWild, scoreIfNotWild)
  }

  return doThing([], letters)
}

export const scoreWord = (word: LetterInstance[], money: number) => {
  const isValid = getIsValidWord(word)
  const isUnderBudget = word.reduce((sum, letter) => sum + letter.price, 0) <= money
  if (!isValid || !isUnderBudget) {
    return 0
  }

  return word.reduce((sum, letter) => {
    const basePoints = letter.points
    let abilityPoints = 0;
    if (letter.ability?.getIsActive(word, letter.position || 0)) {
      abilityPoints = letter.ability.getPoints(word, letter.position || 0)
    }
    return sum + basePoints + abilityPoints
  }, 0)
}