import { Abilities } from '../enums/Abilities';
import { IRawLetter } from './IRawLetter';

export interface ILetter extends IRawLetter {
  price: number;
  points: number;
  ability?: Abilities;
  abilityPoints?: number;
}