import { ICampaignGame, IDailyGame, IGameStats, IPlayer } from '../../../src/shared/datamodels';
import { IUser } from '../datamodels';
import { getCampaignGame } from '../games/getCampaignGame';
import { getDailyGame } from '../games/getDailyGame';
import { IDatabaseConnection } from './IDatabaseConnection';

export class FakeDatabaseConnection implements IDatabaseConnection {
  players: Map<string, IPlayer> = new Map()
  users: Map<string, IUser> = new Map()
  gameStats: Map<string, IGameStats> = new Map()

  getPlayer = (userId: string): Promise<IPlayer | undefined> => {
    return Promise.resolve(this.players.get(userId))
  }

  createPlayer = (player: IPlayer): Promise<IPlayer> => {
    this.players.set(player.userId, player)
    return Promise.resolve(player)
  }

  submitPlayer = (player: IPlayer): Promise<IPlayer> => {
    this.players.set(player.userId, player)
    return Promise.resolve(player)
  }

  getDailyGame = (dateString: string): Promise<IDailyGame | undefined> => {
    return Promise.resolve(getDailyGame(dateString))
  }

  getCampaignGame = (dateString: string): Promise<ICampaignGame | undefined> => {
    return Promise.resolve(getCampaignGame(dateString))
  }

  getUser = (userId: string): Promise<IUser | undefined> => {
    return Promise.resolve(this.users.get(userId))
  }

  createUser = (user: IUser): Promise<IUser> => {
    this.users.set(user.id, user)
    return Promise.resolve(user)
  }

  updateUser = (user: IUser): Promise<IUser> => {
    this.users.set(user.id, user)
    return Promise.resolve(user)
  }

  getGameStats = (dateString: string): Promise<IGameStats | undefined> => {
    return Promise.resolve(this.gameStats.get(dateString))
  };

  updateGameStats = (gameStats: IGameStats): Promise<IGameStats> => {
    this.gameStats.set(gameStats.date, gameStats)
    return Promise.resolve(gameStats)
  };
}