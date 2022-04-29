import { IUser as SharedIUser } from '../../../shared/datamodels/IUser';

export interface IUser extends SharedIUser {
  nickname: string;
  campaignRating: number;
  lastDailyGameSubmit?: string;
  previousDailyGameSubmit?: string;
}