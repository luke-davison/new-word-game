export interface RawLetter {
  letter: string;
  price: number;
  points: number;
  ability?: Abilities;
  abilityPoints?: number;
}

export interface ShopLetter {
  id: string;
  position?: number;
  color: number;
  letter: string;
  price: number;
  points: number;
  ability?: Ability;
  isWild?: boolean;
}

export interface Ability {
  id: string;
  image: string;
  text: string;
  points?: number;
  multiplier?: number;
  getIsActive: (word: ShopLetter[], position: number) => boolean,
  getPoints: (word: ShopLetter[], position: number) => number
}

export interface Game {
  date: string;
  letters: RawLetter[];
  target: number;
  secretTarget: number;
  maxTarget: number;
  money: number;
}

export enum Abilities {
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
  Vowels,
  Wilds
}