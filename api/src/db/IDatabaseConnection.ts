import { ICampaignGame, IDailyGame, IGameStats, IPlayer } from '../../../common/datamodels';
import { IUser } from '../datamodels';

export interface IDatabaseConnection {
  getPlayer: (userId: string) => Promise<IPlayer | undefined>
  createPlayer: (player: IPlayer) => Promise<IPlayer>
  submitPlayer: (player: IPlayer) => Promise<IPlayer>
  getDailyGame: (dateString: string) => Promise<IDailyGame | undefined>
  getCampaignGame: (dateString: string) => Promise<ICampaignGame | undefined>
  getUser: (userId: string) => Promise<IUser | undefined>
  createUser: (user: IUser) => Promise<IUser>
  updateUser: (user: IUser) => Promise<IUser>
  getGameStats: (dateString: string) => Promise<IGameStats | undefined>
  updateGameStats: (gameStats: IGameStats) => Promise<IGameStats | undefined>
}