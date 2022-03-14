import { computed, makeObservable, observable } from 'mobx';

import { ShopLetter } from '../models';
import { getIsValidWord } from '../utils/getWordlist';

export class GameStore {
  constructor(shopLetters: ShopLetter[]) {
    makeObservable(this, {
      shopLetters: observable,
      playerWord: observable,
      draggingId: observable,
      money: computed,
      isValidWord: computed,
      wordPoints: computed
    })

    this.shopLetters = [...shopLetters, { id: "?", position: 8, letter: "", price: 1, points: 0 }]
  }

  shopLetters: ShopLetter[] = []
  letterCount: number = 3

  playerWord: ShopLetter[] = [
    // { id: "player-1", position: 4, letter: "D", price: 4, points: 5 },
    // { id: "player-2", position: 2, letter: "O", price: 2, points: 2 }
  ]

  draggingId: string | undefined;

  totalMoney: number = 15

  get money() {
    return this.totalMoney - this.playerWord.reduce((sum, letter) => sum + letter.price, 0)
  }

  get isValidWord() {
    return getIsValidWord(this.playerWord)
  }

  get wordPoints() {
    return this.playerWord.reduce((sum, letter, index) => {
      const basePoints = letter.points
      let abilityPoints = 0;
      if (letter.ability?.getIsActive(this.playerWord, index)) {
        abilityPoints = letter.ability.getPoints(this.playerWord, index)
      }
      return sum + basePoints + abilityPoints
    }, 0)
  }
}