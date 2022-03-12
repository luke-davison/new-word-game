import { ShopLetter } from '../models';

export const getSampleGame = (): ShopLetter[] => {
  return [
    { position: 1, letter: "W", price: 5, points: 5 },
    { position: 2, letter: "O", price: 2, points: 2 },
    { position: 3, letter: "R", price: 2, points: 2 },
    { position: 4, letter: "D", price: 4, points: 5 },
    { position: 5, letter: "L", price: 2, points: 2 },
    { position: 6, letter: "E", price: 1, points: 1 }
  ]
}