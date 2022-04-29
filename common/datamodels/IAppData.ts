import { ICampaignGame } from './ICampaignGame';
import { IGameStats } from './IGameStats';
import { ILeague } from './ILeague';
import { IDailyGame } from './index';
import { IPlayer } from './IPlayer';

export interface IAppData {
  dailyGame: IDailyGame;
  campaignGame: ICampaignGame;
  player: IPlayer;
  previousLeague?: ILeague;
  previousGameStats?: IGameStats;
  currentGameStats?: IGameStats;
}