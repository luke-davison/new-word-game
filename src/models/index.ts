import { Letter } from './Letter';
import { LetterInstance } from './LetterInstance';

export interface RawLetter {
  letter: string;
  price: number;
  points: number;
  ability?: Abilities;
  abilityPoints?: number;
}

export interface Ability {
  id: string;
  image: string;
  text: string;
  points?: number;
  multiplier?: number;
  getIsActive: (word: LetterInstance[], position: number) => boolean,
  getPoints: (word: LetterInstance[], position: number) => number,
  getEndOfGameEffect?: (word: LetterInstance[], letter: LetterInstance, player: Player) => Player 
}

export interface Game {
  date: string;
  letters: RawLetter[];
  memberLetters?: RawLetter[];
  target?: number;
  secretTarget?: number;
  maxTarget?: number;
  money: number;
}

export interface ScoreInfo {
  date: string;
  exists: boolean;
  attempted: boolean;
  metTarget: boolean;
  metSecretTarget: boolean;
}

export enum Abilities {
  Club,
  Funding1,
  Funding2,
  InPosition1,
  InPosition2,
  InPosition3,
  InPosition4,
  InPositionLast,
  MaxWordLength4,
  MaxWordLength5,
  MaxWordLength6,
  MaxWordLength7,
  MinWordLength4,
  MinWordLength5,
  MinWordLength6,
  MinWordLength7,
  NextToVowel,
  NextToWild,
  NotNextToVowel,
  OtherInPosition1,
  OtherInPosition2,
  OtherInPosition3,
  OtherInPosition4,
  OtherInPosition5,
  OtherInPositionLast,
  Retain,
  RetainLeft,
  RetainRight,
  Vowels,
  Wilds,
  WordLength4,
  WordLength5,
  WordLength6,
  WordLength7
}

export interface Player {
  inventory: Letter[],
  funding: number,
  isMember?: boolean,
  points: number
}