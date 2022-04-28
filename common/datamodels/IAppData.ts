import { ICampaignGame } from './ICampaignGame';
import { ILeague } from './ILeague';
import { IDailyGame } from './index';
import { IPlayer } from './IPlayer';

export interface IAppData {
  dailyGame: IDailyGame;
  campaignGame: ICampaignGame;
  player: IPlayer;
  league?: ILeague;
}