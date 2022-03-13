import { makeObservable, observable } from 'mobx';

import { ShopLetter } from '../models';

export class GameStore {
  constructor(shopLetters: ShopLetter[]) {
    makeObservable(this, {
      shopLetters: observable,
      playerWord: observable,
      draggingId: observable
    })

    this.shopLetters = [...shopLetters, { id: "?", position: 8, letter: "", price: 1, points: 0 }]
  }

  shopLetters: ShopLetter[] = []
  letterCount: number = 3

  playerWord: ShopLetter[] = [
    { id: "player-1", position: 4, letter: "D", price: 4, points: 5 },
    { id: "player-2", position: 2, letter: "O", price: 2, points: 2 }
  ]

  draggingId: string | undefined;
}