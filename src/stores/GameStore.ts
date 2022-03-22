import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { Game, ShopLetter } from '../models';
import { generateGame } from '../utils/generateRandomGame';
import { getWildAbility } from '../utils/getAbilities';
import { getBestWords } from '../utils/getBestWords';
import { getLettersFromGame } from '../utils/getLettersFromGame';
import { getIsValidWord } from '../utils/getWordlist';

let running = false

export class GameStore {
  constructor(game: Game | undefined) {
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
      bestWord: observable,
      bestWordScore: observable,
      onSubmit: action,
      submitText: observable
    })

    this.game = game

    
    if (this.game) {
      if (!running) {
        running = true
        // console.log(getBestWords(this.game))
      }
      this.shopLetters = [
        ...getLettersFromGame(this.game),
        { id: "?", color: 0, letter: "", price: 1, points: 0, isWild: true, ability: getWildAbility() }
      ]
    } else {
      this.shopLetters = [
        ...generateGame(),
        { id: "?", color: 0, letter: "", price: 1, points: 0, isWild: true, ability: getWildAbility() }
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

  get totalMoney(): number {
    return this.game?.money || 18
  }

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

  get target(): number {
    return this.game?.target || 25
  }

  get secretTarget(): number {
    return this.game?.secretTarget || 30
  }

  bestWord: string | undefined
  bestWordScore: number | undefined

  onDropLetter = (letter: ShopLetter, position: number) => {
    this.submitText = ""
    this.playerWordData = [
      ...this.playerWord.filter((otherLetter) => otherLetter.position !== position && (letter.position === undefined || otherLetter.position !== letter.position)),
      { ...letter, position }
    ]
  }

  onDropLetterBetween = (letter: ShopLetter, position: number) => {
    this.submitText = ""

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
      this.submitText = ""
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

  submitText: string | undefined;

  onSubmit = () => {
    const isValid = getIsValidWord(this.playerWord) && this.money >= 0
    if (isValid) {
      this.submitText = "Valid word"
      if (this.wordPoints > (this.bestWordScore || 0)) {
        this.bestWordScore = this.wordPoints;
        const str = this.playerWord.map((letter) => letter.letter).join("")
        this.bestWord = str[0].toUpperCase() + str.slice(1)
      }
    } else {
      this.submitText = "Invalid word"
    }

  }
}