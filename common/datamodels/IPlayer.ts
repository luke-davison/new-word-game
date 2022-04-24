import { ILetter } from './ILetter';

export interface IPlayer {
  startDate: string;
  endDate: string;
  userId: string;
  inventory: ILetter[];
  funding: number;
  isMember: boolean;
  points: number;
}