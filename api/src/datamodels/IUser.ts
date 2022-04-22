import { IUser as CommonIUser } from '../../../common/datamodels/IUser';

export interface IUser extends CommonIUser {
  nickname: string;
}