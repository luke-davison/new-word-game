import { ShopLetter } from '../models';
import {
    getDoubleOtherLetterAbility, getInPositionAbility, getNextToVowelAbility
} from './getAbilities';

export const getSampleGame = (): ShopLetter[] => {
  return [
    { id: "w1", position: 1, letter: "W", price: 5, points: 2, ability: getDoubleOtherLetterAbility(3) },
    { id: "o2", position: 2, letter: "O", price: 5, points: 2, ability: getNextToVowelAbility(2) },
    { id: "r3", position: 3, letter: "R", price: 4, points: 2, ability: getInPositionAbility(2, 1) },
    { id: "d4", position: 4, letter: "D", price: 5, points: 5 },
    { id: "l5", position: 5, letter: "L", price: 2, points: 2 },
    { id: "e6", position: 6, letter: "E", price: 1, points: 1 }
  ]
}