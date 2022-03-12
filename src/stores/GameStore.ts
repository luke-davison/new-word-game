import { makeObservable, observable } from 'mobx';

import { ShopLetter } from '../models';

export class GameStore {
  constructor(shopLetters: ShopLetter[]) {
    makeObservable(this, {
      shopLetters: observable
    })

    this.shopLetters = shopLetters
  }

  shopLetters: ShopLetter[] = []

  playerWord: ShopLetter[] = []
}