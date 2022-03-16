import { action, computed, makeObservable, observable } from 'mobx';

import { ShopLetter } from '../models';
import { getIsValidWord } from '../utils/getWordlist';

export class GameStore {
  constructor(shopLetters: ShopLetter[]) {
    makeObservable(this, {
      shopLetters: observable,
      playerWordData: observable,
      money: computed,
      isValidWord: computed,
      wordPoints: computed,
      onDropLetter: action,
      playerWord: computed
    })

    this.shopLetters = [...shopLetters, { id: "?", color: 8, letter: "", price: 1, points: 0 }]
  }

  shopLetters: ShopLetter[] = []
  letterCount: number = 3

  playerWordData: ShopLetter[] = []

  get playerWord(): ShopLetter[] {
    return Array.from(this.playerWordData).sort((a, b) => {
      return (a.position || 0) - (b.position || 0)
    })
  }

  totalMoney: number = 15

  get money() {
    return this.totalMoney - this.playerWord.reduce((sum, letter) => sum + letter.price, 0)
  }

  get isValidWord() {
    return getIsValidWord(this.playerWord)
  }

  get wordPoints() {
    const sortedWord = Array.from(this.playerWord).sort((a, b) => {
      return (a.position || 0) - (b.position || 0)
    })

    return sortedWord.reduce((sum, letter, index) => {
      const basePoints = letter.points
      let abilityPoints = 0;
      if (letter.ability?.getIsActive(this.playerWord, index)) {
        abilityPoints = letter.ability.getPoints(this.playerWord, index)
      }
      return sum + basePoints + abilityPoints
    }, 0)
  }

  onDropLetter = (letter: ShopLetter, position: number) => {
    this.playerWordData = [
      ...this.playerWord.filter((otherLetter) => otherLetter.position !== position && (letter.position === undefined || otherLetter.position !== letter.position)),
      { ...letter, position }
    ]
  }

  onDropLetterOutside = (letter: ShopLetter) => {
    if (letter.position !== undefined) {
      this.playerWordData = this.playerWord.filter((otherLetter) => otherLetter.position !== letter.position)
    }
  }
}