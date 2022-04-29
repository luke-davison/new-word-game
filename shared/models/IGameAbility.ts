import { LetterInstance } from './LetterInstance';
import { Player } from './Player';

export interface IGameAbility {
  id: string;
  image: string;
  text: string;
  points?: number;
  multiplier?: number;
  getIsActive: (word: LetterInstance[], position: number) => boolean,
  getPoints: (word: LetterInstance[], position: number) => number,
  getEndOfGameEffect?: (word: LetterInstance[], letter: LetterInstance, player: Player) => Player 
}