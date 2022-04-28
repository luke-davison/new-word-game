import { ICampaignGame, IDailyGame, IPlayer } from '../../../common/datamodels';
import { getDateString } from '../../../common/utils';
import { IUser } from '../datamodels';
import { getCampaignGame } from '../games/getCampaignGame';
import { getDailyGame } from '../games/getDailyGame';
import { generateNickname } from '../utils/generateNickname';
import { getNextEndOfCampaignDateString } from '../utils/getNextEndOfCampaignDateString';
import { IDatabaseConnection } from './IDatabaseConnection';

export class FakeDatabaseConnection implements IDatabaseConnection {
  players: Map<string, IPlayer> = new Map()
  users: Map<string, IUser> = new Map()

  getPlayer = (userId: string): Promise<IPlayer | undefined> => {
    return Promise.resolve(this.players.get(userId))
  }

  createPlayer = (userId: string): Promise<IPlayer> => {
    const startDate = getDateString(new Date())
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

    this.players.set(userId, player)

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

  createUser = (): Promise<IUser> => {
    const id = String(Math.random()).slice(2)
    const nickname = generateNickname();
    const user: IUser = { id, nickname, campaignRating: 1000 }

    this.users.set(id, user)

    return Promise.resolve(user)
  }
}