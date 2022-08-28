import { IRawLetter } from './IRawLetter'

export interface ISubmitWord {
  date: string;
  userId: string;
  word: IRawLetter[];
}