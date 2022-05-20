import { IDailyGame } from "../shared"
import { DAILY_PREFIX, GAME_IDS } from "./cacheAppData"

export const loadCachedGames = (): IDailyGame[] => {
  const gameIdsString = window.localStorage.getItem(GAME_IDS)
  if (!gameIdsString) {
    return []
  }

  const games: IDailyGame[] = []

  const dateStrings = gameIdsString.split(",")

  dateStrings.forEach(dateString => {
    const gameString = window.localStorage.getItem(DAILY_PREFIX + dateString)
    if (!gameString) {
      return
    }

    try {
      const game = JSON.parse(gameString) as IDailyGame
      games.push(game)
    } catch {
      console.log("Unable to parse daily game", gameString)
    }
  })

  return games
}