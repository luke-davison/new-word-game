import { IDailyGame } from '../shared';
import { IRawLetter } from '../shared/datamodels/IRawLetter';
import { DAILY_PREFIX, GAME_IDS, SCORE_SUFFIX, WORD_SUFFIX } from './cacheAppData';

interface ICachedData {
  dates: string[]
  games: Map<string, IDailyGame>;
  scores: Map<string, number>;
  words: Map<string, IRawLetter[]>
}

export const loadCachedGameData = (): ICachedData | undefined => {
  const gameIdsString = window.localStorage.getItem(GAME_IDS)
  if (!gameIdsString) {
    return undefined
  }

  const games: Map<string, IDailyGame> = new Map()
  const scores: Map<string, number> = new Map()
  const words: Map<string, IRawLetter[]> = new Map()

  const dateStrings = gameIdsString.split(",")

  const filteredDates = dateStrings.filter(dateString => {
    const gameString = window.localStorage.getItem(DAILY_PREFIX + dateString)
    if (!gameString) {
      return false
    }

    try {
      const game = JSON.parse(gameString) as IDailyGame
      games.set(dateString, game)
    } catch {
      console.log("Unable to parse daily game", gameString)
    }

    const scoreString = window.localStorage.getItem(DAILY_PREFIX + dateString + SCORE_SUFFIX)

    if (scoreString) {
      scores.set(dateString, Number(scoreString))
    }

    const wordString = window.localStorage.getItem(DAILY_PREFIX + dateString + WORD_SUFFIX)
    if (wordString) {
      try {
        const word = JSON.parse(wordString) as IRawLetter[]
        words.set(dateString, word)
      } catch {
        console.log("Unable to parse daily word", gameString)
      }
    }

    if (!scores.has(dateString) || !words.has(dateString)) {
      scores.delete(dateString);
      words.delete(dateString)
      return false
    }

    return true
  })

  return { dates: filteredDates, games, scores, words }
}