import { IAppData, ICampaignGame, IDailyGame, IGameStats } from '../shared';

export const GAME_IDS = "gameIds"
export const DAILY_PREFIX = "daily-"
export const DAILY_STATS_PREVIX = "dailystats-"
export const CAMPAIGN_PREFIX = "campaign-"

export const cacheAppData = (appData: IAppData) => {
  cacheDate(appData.date)
  cacheDailyGame(appData.dailyGame)
  cacheCampaignGame(appData.campaignGame)
  
  if (appData.previousDailyGameDate && appData.previousDailyGameStats) {
    cachePreviousGameStats(appData.previousDailyGameDate, appData.previousDailyGameStats)
  }
}

const cacheDate = (dateString: string) => {
  const gameIdsString = window.localStorage.getItem(GAME_IDS)
  const gameIds: string[] = gameIdsString === null ? [] : gameIdsString.split(",")
  gameIds.push(dateString)
  window.localStorage.setItem(GAME_IDS, gameIds.join(","))
}

const cacheDailyGame = (game: IDailyGame) => {
  window.localStorage.setItem(DAILY_PREFIX + game.date, JSON.stringify(game))
}

const cacheCampaignGame = (game: ICampaignGame) => {
  window.localStorage.setItem(CAMPAIGN_PREFIX + game.date, JSON.stringify(game))
}

const cachePreviousGameStats = (dateString: string, stats: IGameStats) => {
  window.localStorage.setItem(DAILY_STATS_PREVIX + dateString, JSON.stringify(stats))
}