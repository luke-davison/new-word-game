import { Abilities } from '../enums/Abilities';

export interface ILetter {
  id: string;
  char: string;
  price: number;
  points: number;
  ability?: Abilities;
  abilityPoints?: number;
}