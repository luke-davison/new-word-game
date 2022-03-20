import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { Game, ShopLetter } from '../models';
import { getDailyGame } from '../utils/getDailyGame';
import { getLettersFromGame } from '../utils/getLettersFromGame';
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
      onDropLetterBetween: action,
      onDropLetterOutside: action,
      playerWord: computed
    })

    this.game = getDailyGame()

    if (this.game) {
      this.shopLetters = [
        ...getLettersFromGame(this.game),
        { id: "?", color: 0, letter: "", price: 1, points: 0, isWild: true }
      ]
    }
  }

  game: Game | undefined;

  shopLetters: ShopLetter[] = []
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

  onDropLetterBetween = (letter: ShopLetter, position: number) => {
    const findNextEmpty = (nextPosition: number): number => {
      if (this.playerWord.some(letter => letter.position === nextPosition)) {
        return findNextEmpty(nextPosition + 1)
      }
      return nextPosition
    }

    const nextEmptyPosition = findNextEmpty(position)
    for (let i = nextEmptyPosition - 1; i >= position; i--) {
      const existingLetter = this.playerWord.find(letter => letter.position === i)
      if (existingLetter) {
        existingLetter.position = (existingLetter.position || 0) + 1
      }
    }
    this.playerWordData.push({ ...letter, position })
  }

  onDropLetterOutside = (letter: ShopLetter) => {
    if (letter.position !== undefined) {
      this.playerWordData = this.playerWord.filter((otherLetter) => otherLetter.position !== letter.position)
    }
  }

  onClickLetter = (letter: ShopLetter) => {
    if (letter.isWild) {
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