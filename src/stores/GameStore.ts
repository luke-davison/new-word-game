import { makeObservable, observable } from 'mobx';

import { ShopLetter } from '../models';

export class GameStore {
  constructor(shopLetters: ShopLetter[]) {
    makeObservable(this, {
      shopLetters: observable,
      playerWord: observable
    })

    this.shopLetters = shopLetters
  }

  shopLetters: ShopLetter[] = []

  playerWord: ShopLetter[] = [
    { id: "d4", position: 4, letter: "D", price: 4, points: 5 },
    { id: "o2", position: 2, letter: "O", price: 2, points: 2 }
  ]
}