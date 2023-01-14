import { ILetter } from './ILetter'

export interface IPlayer {
  inventory: ILetter[];
  funding: number;
  isMember: boolean;
  points: number;
  lastSubmit: string;
}