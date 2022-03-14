import { ShopLetter } from '../models';
import {
    getDoubleOtherLetterAbility, getInPositionAbility, getNextToVowelAbility
} from './getAbilities';

export const getSampleGame = (): ShopLetter[] => {
  return [
    { id: "w1", position: 1, letter: "w", price: 5, points: 2, ability: getDoubleOtherLetterAbility(2) },
    { id: "o2", position: 2, letter: "o", price: 4, points: 2, ability: getNextToVowelAbility(2) },
    { id: "r3", position: 3, letter: "r", price: 3, points: 2, ability: getInPositionAbility(2, 0) },
    { id: "d4", position: 4, letter: "d", price: 5, points: 5 },
    { id: "l5", position: 5, letter: "l", price: 2, points: 2 },
    { id: "e6", position: 6, letter: "e", price: 1, points: 1 }
  ]
}