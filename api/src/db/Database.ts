import { ICampaignGame, IDailyGame, IPlayer } from "../../../common/datamodels";
import { FakeDatabaseConnection } from "./FakeDatabaseConnection";
import { IDatabaseConnection } from "./IDatabaseConnection";

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
    return this.databaseConnection.createPlayer(userId)
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
}

export const db = new Database(new FakeDatabaseConnection())