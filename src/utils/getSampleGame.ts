import { ShopLetter } from '../models';
import {
    getDoubleOtherLetterAbility, getInPositionAbility, getMinWordLengthAbility,
    getNextToVowelAbility
} from './getAbilities';

const game1 = [
  { id: "w1", color: 1, letter: "w", price: 5, points: 2, ability: getDoubleOtherLetterAbility(2) },
  { id: "o2", color: 2, letter: "o", price: 4, points: 2, ability: getNextToVowelAbility(2) },
  { id: "r3", color: 3, letter: "r", price: 3, points: 2, ability: getInPositionAbility(2, 0) },
  { id: "d4", color: 4, letter: "d", price: 5, points: 5 },
  { id: "l5", color: 5, letter: "l", price: 2, points: 2 },
  { id: "e6", color: 6, letter: "e", price: 1, points: 1 }
]

const game2 = [
  { id: "w1", color: 1, letter: "b", price: 5, points: 2, ability: getDoubleOtherLetterAbility(2) },
  { id: "o2", color: 2, letter: "e", price: 1, points: 1 },
  { id: "r3", color: 3, letter: "t", price: 3, points: 2, ability: getInPositionAbility(2, 0) },
  { id: "d4", color: 4, letter: "t", price: 4, points: 2, ability: getNextToVowelAbility(2) },
  { id: "l5", color: 5, letter: "y", price: 5, points: 5 },
  { id: "e6", color: 6, letter: "j", price: 3, points: 2, ability: getMinWordLengthAbility(3, 5) }
]

export const getSampleGame = (): ShopLetter[] => {
  return game2
}