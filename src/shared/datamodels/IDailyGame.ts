import { IGame } from './IGame'

export interface IDailyGame extends IGame {
  target: number;
  secretTarget: number;
}