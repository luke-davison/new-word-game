import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';

import { Game } from '../models';
import { Letter } from '../models/Letter';
import { LetterInstance } from '../models/LetterInstance';
import { generateGame } from '../utils/generateRandomGame';
import { getWildAbility } from '../utils/getAbilities';
import { getCampaignGame } from '../utils/getCampaignGame';
import { getDailyGame } from '../utils/getDailyGame';
import { getLettersFromRawLetters } from '../utils/getLettersFromRawLetters';
import { getIsValidWord } from '../utils/getWordlist';
import { AppStore } from './AppStore';
import { CampaignStore } from './CampaignStore';

interface Stores {
  appStore: AppStore,
  campaignStore?: CampaignStore
}

export class GameStore {
  get appStore() {
    return this.stores.appStore
  }

  get campaignStore() {
    return this.stores.campaignStore
  }

  constructor(private stores: Stores) {
    makeObservable(this, {
      _shopLetters: observable,
      playerWordData: observable,
      money: computed,
      isValidWord: computed,
      isRealWord: computed,
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
      wordLetters: computed,
      inventory: computed,
      _secretShopLetters: observable,
      shopLetters: computed,
      secretShopLetters: computed
    })

    if (this.appStore.isPlayingDailyGame) {
      this.game = getDailyGame(this.appStore.dailyGameInProgress)
    } else if (this.appStore.isPlayingCampaignGame && this.campaignStore) {
      this.game = getCampaignGame(this.campaignStore.campaignId, this.campaignStore.campaignDay)
    } else {
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
          if (this.isValidWord) {
            this.isValidText = "Valid word"
            if (this.wordPoints >= (this.bestWordScore || 0)) {
              const openCalendar = this.appStore.isPlayingDailyGame
                && (this.bestWordScore || 0) < (this.game?.target || 0)
                && this.wordPoints >= (this.game?.target || 0)

              this.bestWordScore = this.wordPoints;
              const str = this.playerWord.map((letter) => letter.letter).join("")
              this.bestWord = str[0].toUpperCase() + str.slice(1)
              window.localStorage.setItem(`${this.game?.date}-word`, this.bestWord)
              window.localStorage.setItem(`${this.game?.date}-score`, String(this.bestWordScore))

              if (openCalendar) {
                this.appStore.toggleIsShowingCalendar()
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

    this._shopLetters = [
      ...getLettersFromRawLetters(this.game?.letters),
      new Letter({ color: 0, letter: "", price: 1, points: 0, isWild: true, ability: getWildAbility()})
    ]

    this._secretShopLetters = getLettersFromRawLetters(this.game?.memberLetters)
  }
  
  game: Game | undefined;
  
  _shopLetters: Letter[] = []
  get shopLetters(): LetterInstance[] {
    return this._shopLetters.map((letter) => {
      return new LetterInstance(letter)
    })
  }

  get inventory(): LetterInstance[] {
    const availableLetters = this.campaignStore?.player.inventory.filter(letter => letter.limit !== 0) || []

    return availableLetters.map((letter) => {
      return new LetterInstance(letter)
    })
  }

  _secretShopLetters: Letter[] = []
  get secretShopLetters(): LetterInstance[] {
    if (!this.campaignStore?.player.isMember) {
      return []
    }

    return this._secretShopLetters.map((letter) => {
      return new LetterInstance(letter)
    })
  }
  
  playerWordData: LetterInstance[] = []
  
  get playerWord(): LetterInstance[] {
    return Array.from(this.playerWordData).sort((a, b) => {
      return (a.position || 0) - (b.position || 0)
    })
  }
  
  get totalMoney(): number {
    let money = this.game?.money || 18
    if (this.appStore.isPlayingCampaignGame && this.campaignStore) {
      money += this.campaignStore.player.funding
    }
    return money
  }
  
  get money() {
    return this.totalMoney - this.playerWord.reduce((sum, letter) => sum + letter.price, 0)
  }
  
  get isRealWord() {
    return getIsValidWord(this.playerWord)
  }

  get isValidWord() {
    return this.isRealWord && this.money >= 0
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
  
  onDropLetter = (droppedLetter: LetterInstance, position: number) => {
    let letter: LetterInstance
    if (droppedLetter.position === undefined) {
      letter = new LetterInstance(droppedLetter.parent, position)
      letter.parent.onPlaceLetter()
    } else {
      letter = droppedLetter
      letter.setPosition(position)
    }

    if (letter.position === undefined) {
      letter.parent.onPlaceLetter()
    }

    letter.setPosition(position)

    this.playerWordData = [
      ...this.playerWord.filter((otherLetter) => otherLetter.id !== letter.id && (letter.position === undefined || otherLetter.position !== letter.position)),
      letter
    ]
  }

  onDropLetterBetween = (droppedLetter: LetterInstance, position: number) => {
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

    let letter: LetterInstance
    if (droppedLetter.position === undefined) {
      letter = new LetterInstance(droppedLetter.parent, position)
      letter.parent.onPlaceLetter()
    } else {
      letter = droppedLetter
      letter.setPosition(position) 
    }

    this.playerWordData.push(letter)
  }

  onDropLetterOutside = (letter: LetterInstance) => {
    if (letter.position !== undefined) {
      this.playerWordData = this.playerWord.filter((otherLetter) => otherLetter.id !== letter.id)
      letter.parent.onUnplaceLetter()
    }
  }

  onClickLetter = (letter: LetterInstance) => {
    if (letter.isWild) {
      setTimeout(() => {
        // check whether letter has been removed
        if (this.playerWord.some((otherLetter) => otherLetter.id === letter.id)) {
          const newValue = prompt("Enter a letter");
          letter.setWildLetter(newValue || "")
        }
      }, 300)
    }
  }

  onQuickAddLetter = (letter: LetterInstance) => {
    let nextPosition = 0;
    while (this.playerWord.some((otherLetter) => otherLetter.position === nextPosition)) {
      nextPosition++
    }
    this.onDropLetter(letter, nextPosition)
  }

  onQuickRemoveLetter = (letter: LetterInstance) => {
    this.onDropLetterOutside(letter)
  }

  onClear = () => {
    this.playerWordData = []
  }
}