import { IUser } from '../../../common/datamodels';

export interface IDatabase {
  getUser: (id: string) => Promise<IUser>
}