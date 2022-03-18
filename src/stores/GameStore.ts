import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { ShopLetter } from '../models';
import { generateGame } from '../utils/generateRandomGame';
import { getIsValidWord } from '../utils/getWordlist';

export class GameStore {
  constructor() {
    makeObservable(this, {
      shopLetters: observable,
      playerWordData: observable,
      money: computed,
      isValidWord: computed,
      wordPoints: computed,
      onDropLetter: action,
      onDropLetterOutside: action,
      playerWord: computed
    })
  }

  shopLetters: ShopLetter[] = [
    ...generateGame(),
    { id: "?", color: 8, letter: "", price: 1, points: 0 }
  ]
  letterCount: number = 3

  playerWordData: ShopLetter[] = []

  get playerWord(): ShopLetter[] {
    return Array.from(this.playerWordData).sort((a, b) => {
      return (a.position || 0) - (b.position || 0)
    })
  }

  totalMoney: number = 18

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

  onClickLetter = (letter: ShopLetter) => {
    if (letter.id === "?") {
      const newValue = prompt("Enter a letter");
      runInAction(() => {
        letter.letter = newValue || ""
      })
    }
  }

  onQuickAddLetter = (letter: ShopLetter) => {
    let nextPosition = 0;
    while (this.playerWord.some((otherLetter) => otherLetter.position === nextPosition)) {
      nextPosition++
    }
    this.onDropLetter(letter, nextPosition)
  }

  onQuickRemoveLetter = (letter: ShopLetter) => {
    this.onDropLetterOutside(letter)
  }
}