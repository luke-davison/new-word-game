import { ILetter } from './ILetter'

export interface IGame {
  date: string;
  letters: ILetter[];
  money: number;
}