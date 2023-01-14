import { ICampaignGame } from './ICampaignGame'
import { IDailyGame } from './index'

export interface IAppData {
  date: string;
  dailyGame: IDailyGame;
  campaignGame: ICampaignGame;
}