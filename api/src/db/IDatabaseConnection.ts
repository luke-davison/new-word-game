import { ICampaignGame, IDailyGame, IPlayer } from '../../../common/datamodels';
import { IUser } from '../datamodels';

export interface IDatabaseConnection {
  getPlayer: (userId: string) => Promise<IPlayer | undefined>
  createPlayer: (userId: string) => Promise<IPlayer>
  submitPlayer: (player: IPlayer) => Promise<IPlayer>
  getDailyGame: (dateString: string) => Promise<IDailyGame | undefined>
  getCampaignGame: (dateString: string) => Promise<ICampaignGame | undefined>
  getUser: (userId: string) => Promise<IUser | undefined>
  createUser: () => Promise<IUser>
}