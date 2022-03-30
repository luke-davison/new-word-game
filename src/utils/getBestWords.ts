import { Game, ShopLetter } from '../models';
import { getWildAbility } from './getAbilities';
import { getLettersFromGame } from './getLettersFromGame';
import { getIsValidWord, wordlist } from './getWordlist';

export const getBestWords = (game: Game) => {
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

export const calculateBestScoreForWord = (game: Game, word: string): number => {
  const shop = getLettersFromGame(game)

  const letters = word.split("")

  const doThing = (wordSoFar: ShopLetter[], lettersRemaining: string[]): number => {
    const [nextLetter,  ...otherLetters] = lettersRemaining
    
    const scoreIfNotWild = shop.reduce((highestScore: number, shopLetter: ShopLetter): number => {
      if (nextLetter !== shopLetter.letter) {
        return highestScore
      }

      const newWordSoFar = [...wordSoFar, {...shopLetter, position: wordSoFar.length }]

      if (otherLetters.length === 0) {
        const score = scoreWord(newWordSoFar, game.money)
        return Math.max(score, highestScore)
      }

      const thingScore = doThing(newWordSoFar, otherLetters)
      return Math.max(thingScore, highestScore)
    }, 0)

    const newWordSoFar: ShopLetter[] = [...wordSoFar, { id: "?", position: wordSoFar.length, color: 0, letter: nextLetter, price: 1, points: 0, isWild: true, ability: getWildAbility() }]

    if (otherLetters.length === 0) {
      const score = scoreWord(newWordSoFar, game.money)
      return Math.max(score, scoreIfNotWild)
    }

    const scoreIfWild = doThing(newWordSoFar, otherLetters)
    return Math.max(scoreIfWild, scoreIfNotWild)
  }

  return doThing([], letters)
}

export const scoreWord = (word: ShopLetter[], money: number) => {
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