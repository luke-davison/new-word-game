import { Abilities } from '../../../src/shared';
import { ICampaignGame, IDailyGame, IGameStats, IPlayer } from '../../../src/shared/datamodels';
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

    // temporary
    if (!player) {
      return this.createPlayer(userId)
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
      inventory: [{ id: "asdf", price: 1, points: 4, ability: Abilities.Retain, char: "e" }, { id: "asdf2", price: 1, points: 4, ability: Abilities.Retain, char: "f" }], // temporary
      funding: 0,
      isMember: true,
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

  getOrCreateUser = async (userId: string): Promise<IUser> => {
    const user = await this.getUser(userId)
    if (user) {
      return Promise.resolve(user)
    }

    return this.createUser(userId)
  }

  createUser = async (userId: string): Promise<IUser> => {
    const generatedNickname = generateNickname();
    const user: IUser = { id: userId, nickname: generatedNickname, campaignRating: 1000 }

    return this.databaseConnection.createUser(user)
  }

  updateUser = async (user: IUser): Promise<IUser | undefined> => {
    return await this.databaseConnection.updateUser(user)
  }

  getGameStats = (dateString: string): Promise<IGameStats | undefined> => {
    return this.databaseConnection.getGameStats(dateString)
  }

  submitGameStats = async (dateString: string, score: number, previousScore?: number): Promise<IGameStats> => {
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

    if (previousScore !== undefined) {
      let scoreStat = gameStats.results.find((stat => stat[0] === previousScore))
      if (scoreStat) {
        scoreStat[1] = scoreStat[1] - 1
      } else {
        console.log("Unable to adjust previous score") // should never happen
      }
    }

    await this.databaseConnection.updateGameStats(gameStats)

    return gameStats
  }
}
