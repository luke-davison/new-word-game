import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';

import { Game, ShopLetter } from '../models';
import { generateGame } from '../utils/generateRandomGame';
import { getWildAbility } from '../utils/getAbilities';
import { getLettersFromGame } from '../utils/getLettersFromGame';
import { getIsValidWord } from '../utils/getWordlist';
import { AppStore } from './AppStore';

export class GameStore {
  constructor(private appStore: AppStore, game: Game | undefined) {
    makeObservable(this, {
      shopLetters: observable,
      playerWordData: observable,
      money: computed,
      isValidWord: computed,
      wordPoints: computed,
      onDropLetter: action,
      onDropLetterBetween: action,
      onDropLetterOutside: action,
      playerWord: computed,
      target: computed,
      isValidText: observable,
      bestWord: observable,
      bestWordScore: observable,
      onClear: action,
      wordLetters: computed
    })

    this.game = game

    if (!this.game) {
      const money = 15 + Math.floor(Math.random() * 5)

      this.game = {
        date: String(Math.random()),
        letters: generateGame(),
        money: 15 + Math.floor(Math.random() * 5),
        target: 11 + money,
        secretTarget: 15 + money,
        maxTarget: 16 + money
      }
    }

    runInAction(() => {
      this.bestWord = window.localStorage.getItem(`${this.game?.date}-word`) || ""
      this.bestWordScore = Number(window.localStorage.getItem(`${this.game?.date}-score`) || 0)
    })

    reaction(() => this.wordLetters, () => {
      this.isValidText = undefined
      window.clearTimeout(this.validWordTimeout)
      this.validWordTimeout = window.setTimeout(action(() => {
        if (this.isCompleteWord) {
          if (this.isValidWord && this.money >= 0) {
            this.isValidText = "Valid word"
            if (this.wordPoints >= (this.bestWordScore || 0)) {
              const openCalendar = appStore.isPlayingDailyGame
                && (this.bestWordScore || 0) < (this.game?.target || 0)
                && this.wordPoints >= (this.game?.target || 0)

              this.bestWordScore = this.wordPoints;
              const str = this.playerWord.map((letter) => letter.letter).join("")
              this.bestWord = str[0].toUpperCase() + str.slice(1)
              window.localStorage.setItem(`${this.game?.date}-word`, this.bestWord)
              window.localStorage.setItem(`${this.game?.date}-score`, String(this.bestWordScore))

              if (openCalendar) {
                appStore.toggleIsShowingCalendar()
              }
            }
          } else if (this.money < 0) {
            this.isValidText = "Not enough money"
          } else {
            this.isValidText = "Not a word"
          }
        }
      }), 1500)
    })

    this.shopLetters = [
      ...getLettersFromGame(this.game),
      { id: "?", color: 0, letter: "", price: 1, points: 0, isWild: true, ability: getWildAbility() }
    ]
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
  
  get totalMoney(): number {
    return this.game?.money || 18
  }
  
  get money() {
    return this.totalMoney - this.playerWord.reduce((sum, letter) => sum + letter.price, 0)
  }
  
  get isValidWord() {
    return getIsValidWord(this.playerWord)
  }
  
  get isCompleteWord() {
    const highestPosition = this.playerWord.reduce((high, letter) => {
      const { position = 0 } = letter
      return position > high ? position : high
    }, 0)
    if (highestPosition > this.playerWord.length - 1) {
      return false
    }
    if (this.playerWord.some((letter) => letter.isWild && !letter.letter)) {
      return false
    }
    return true
  }
  
  get wordPoints() {
    const sortedWord = Array.from(this.playerWord).sort((a, b) => {
      return (a.position || 0) - (b.position || 0)
    })
    
    return sortedWord.reduce((sum, letter, index) => {
      const basePoints = letter.points
      let abilityPoints = 0;
      if (letter.ability?.getIsActive(this.playerWord, letter.position!)) {
        abilityPoints = letter.ability.getPoints(this.playerWord, letter.position!)
      }
      return sum + basePoints + abilityPoints
    }, 0)
  }

  get wordLetters() {
    return this.playerWord.map((letter) => letter.letter)
  }
  
  get target(): number {
    return this.game?.target || 25
  }
  
  get secretTarget(): number {
    return this.game?.secretTarget || 30
  }
  
  validWordTimeout: number | undefined
  isValidText: string | undefined
  bestWord: string | undefined
  bestWordScore: number | undefined
  
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
      setTimeout(() => {
        // check whether letter has been removed
        if (this.playerWord.some((otherLetter) => otherLetter.id === letter.id)) {
          const newValue = prompt("Enter a letter");
          runInAction(() => {
            letter.letter = newValue || ""
          })
        }
      }, 300)
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

  onClear = () => {
    this.playerWordData = []
  }
}