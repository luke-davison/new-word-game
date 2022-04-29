import { ICampaignGame, IDailyGame, IGameStats, IPlayer } from '../../../common/datamodels';
import { IUser } from '../datamodels';
import { generateNickname } from '../utils/generateNickname';
import { getNextEndOfCampaignDateString } from '../utils/getNextEndOfCampaignDateString';
import { getTodayDateString } from '../utils/getTodayDateString';
import { IDatabaseConnection } from './IDatabaseConnection';

export class Database {
  constructor(public databaseConnection: IDatabaseConnection) {}
  
  getPlayer = async (userId: string, startDate: string): Promise<IPlayer | undefined> => {
    const player = await this.databaseConnection.getPlayer(userId)
    if (player && player.startDate !== startDate) {
      return undefined
    }

    return player
  }

  getOrCreatePlayer = async (userId: string, startDate: string): Promise<IPlayer> => {
    const player = await this.databaseConnection.getPlayer(userId)

    if (player) {
      if (player.startDate !== startDate) {
        return this.createPlayer(userId);
      }

      return player
    }

    return this.createPlayer(userId)
  }

  createPlayer = async (userId: string): Promise<IPlayer> => {
    const startDate = getTodayDateString();
    const endDate = getNextEndOfCampaignDateString(new Date())

    const player: IPlayer = {
      startDate,
      endDate,
      userId,
      inventory: [],
      funding: 0,
      isMember: false,
      points: 0,
      lastSubmit: ""
    }

    return this.databaseConnection.createPlayer(player)
  }

  submitPlayer = async (player: IPlayer): Promise<IPlayer> => {
    return this.databaseConnection.submitPlayer(player)
  }

  getDailyGame = async (dateString: string): Promise<IDailyGame | undefined> => {
    return this.databaseConnection.getDailyGame(dateString)
  }

  getCampaignGame = async (dateString: string): Promise<ICampaignGame | undefined> => {
    return this.databaseConnection.getCampaignGame(dateString)
  }

  getUser = async (userId: string): Promise<IUser | undefined> => {
    return await this.databaseConnection.getUser(userId)
  }

  createUser = async (): Promise<IUser> => {
    const id = String(Math.random()).slice(2)
    const generatedNickname = generateNickname();
    const user: IUser = { id, nickname: generatedNickname, campaignRating: 1000 }

    return this.databaseConnection.createUser(user)
  }

  updateUser = async (user: IUser): Promise<IUser | undefined> => {
    return await this.databaseConnection.updateUser(user)
  }

  getGameStats = (dateString: string): Promise<IGameStats | undefined> => {
    return this.databaseConnection.getGameStats(dateString)
  }

  submitGameStats = async (dateString: string, score: number): Promise<IGameStats> => {
    let gameStats: IGameStats | undefined = await this.getGameStats(dateString);

    if (gameStats) {
      let scoreStat = gameStats.results.find((stat => stat[0] === score))
      if (scoreStat) {
        scoreStat[1] = scoreStat[1] + 1
      } else {
        scoreStat = [score, 1]
        gameStats.results.push(scoreStat)
      }
    } else {
      gameStats = {
        date: dateString,
        results: [[score, 1]]
      }
    }

    await this.databaseConnection.updateGameStats(gameStats)

    return gameStats
  }
}
