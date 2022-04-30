import { IUser as SharedIUser } from '../../../src/shared/datamodels/IUser';

export interface IUser extends SharedIUser {
  nickname: string;
  campaignRating: number;
  lastDailyGameSubmit?: string;
  previousDailyGameSubmit?: string;
}