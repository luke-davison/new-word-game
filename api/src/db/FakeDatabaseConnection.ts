import { ICampaignGame, IDailyGame, IPlayer } from "../../../common/datamodels"
import { getDateString } from "../../../common/utils"
import { getNextEndOfCampaignDateString } from "../utils/getNextEndOfCampaignDateString"
import { IDatabaseConnection } from "./IDatabaseConnection"

export class FakeDatabaseConnection implements IDatabaseConnection {
  players: Map<string, IPlayer> = new Map()

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
      points: 0
    }

    this.players.set(userId, player)

    return Promise.resolve(player)
  }

  submitPlayer = (player: IPlayer): Promise<IPlayer> => {
    this.players.set(player.userId, player)

    return Promise.resolve(player)
  }

  getDailyGame = (dateString: string): Promise<IDailyGame | undefined> => {
    return Promise.resolve(this.getDailyGame(dateString))
  }

  getCampaignGame = (dateString: string): Promise<ICampaignGame | undefined> => {
    return Promise.resolve(this.getCampaignGame(dateString))
  }
}