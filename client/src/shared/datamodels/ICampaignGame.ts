import { IGame } from './IGame'
import { ILetter } from './ILetter'

export interface ICampaignGame extends IGame {
  memberLetters: ILetter[];
}