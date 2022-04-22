import { ILetter } from './ILetter';

export interface IPlayer {
  startDate: string;
  userId: string;
  inventory: ILetter[];
  funding: number;
  isMember: boolean;
  points: number;
}