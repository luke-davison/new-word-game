import { IUser as SharedIUser } from '../../../src/shared/datamodels/IUser';
import { IUser } from '../datamodels';

export const removeInternalUserProperties = (user: IUser): SharedIUser => {
  const { nickname, campaignRating, lastDailyGameSubmit, ...restUser } = user
  return restUser
}