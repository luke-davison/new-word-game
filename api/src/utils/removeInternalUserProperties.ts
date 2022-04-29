import { IUser } from "../datamodels";
import { IUser as CommonIUser } from "../../../common/datamodels/IUser"

export const removeInternalUserProperties = (user: IUser): CommonIUser => {
  const { nickname, campaignRating, lastDailyGameSubmit, ...restUser } = user
  return restUser
}