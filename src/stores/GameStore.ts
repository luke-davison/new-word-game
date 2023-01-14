import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx'

import { LetterInstance } from '../models/LetterInstance'
import { ICampaignGame, IDailyGame, IGame, ISubmitWord } from '../shared/datamodels'
import { IRawLetter } from '../shared/datamodels/IRawLetter'
import { Letter } from '../shared/models/Letter'
import { getIsValidWord } from '../shared/utils'
import { getAbilityIsActive } from '../shared/utils/abilities/getAbilityIsActive'
import { getAbilityPoints } from '../shared/utils/abilities/getAbilityPoints'
import { setupLetters } from '../shared/utils/setupLetters'
import { DAILY_PREFIX, SCORE_SUFFIX, WORD_SUFFIX } from '../utils/cacheAppData'
import { convertLetterInstancesToWord } from '../utils/convertLettersToWord'
import { convertWordToLetterInstances } from '../utils/convertWordToLetterInstances'
import { getIntroductoryGame } from '../utils/getIntroductoryGame'
import { AppStore } from './AppStore'

export class GameStore {
  constructor(private appStore: AppStore) {
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
      playerWordFull: computed,
      target: computed,
      isValidText: observable,
      _bestWord: observable,
      bestWordScore: observable,
      bestLetters: observable,
      onClear: action,
      wordLetters: computed,
      inventory: computed,
      _secretShopLetters: observable,
      shopLetters: computed,
      secretShopLetters: computed,
      reinstateBestWord: action
    })

    runInAction(() => {
      const bestWord = window.localStorage.getItem(DAILY_PREFIX + this.game?.date + WORD_SUFFIX) || ''
      if (bestWord) {
        const letters = JSON.parse(bestWord) as IRawLetter[]
        if (letters) {
          this._bestWord = letters.map(({ char }) => char).join('')
          this.bestWordScore = Number(window.localStorage.getItem(DAILY_PREFIX + this.game?.date + SCORE_SUFFIX) || 0)
          this.bestLetters = letters
        }
      }
    })

    reaction(() => this.wordLetters, () => {
      this.isValidText = undefined
      window.clearTimeout(this.validWordTimeout)
      this.validWordTimeout = window.setTimeout(action(() => {
        if (this.isCompleteWord) {
          if (this.isValidWord) {
            this.isValidText = 'Valid word'
            if (this.wordPoints >= (this.bestWordScore || 0)) {
              this.bestWordScore = this.wordPoints
              this._bestWord = this.playerWord.map(letter => letter.char).join('')
              this.bestLetters = convertLetterInstancesToWord(this.playerWord)
              window.localStorage.setItem(DAILY_PREFIX + this.game?.date + WORD_SUFFIX, JSON.stringify(this.bestLetters))
              window.localStorage.setItem(DAILY_PREFIX + this.game?.date + SCORE_SUFFIX, String(this.bestWordScore))
            }
          } else if (this.money < 0) {
            this.isValidText = 'Not enough money'
          } else {
            this.isValidText = 'Not a word'
          }
        }
      }), 1500)
    })

    this._shopLetters = setupLetters(this.game?.letters)
    if (appStore.isPlayingCampaignGame) {
      if (appStore.player?.inventory) {
        this._inventory = setupLetters(appStore.player.inventory)
      }
  
      this._secretShopLetters = setupLetters(this.campaignGame?.memberLetters)
    }
  }

  get dailyGame(): IDailyGame | undefined {
    return this.appStore.dailyGame
  }

  get campaignGame(): ICampaignGame | undefined {
    return this.appStore.campaignGame
  }

  get tutorialGame(): IDailyGame | undefined {
    return getIntroductoryGame(this.appStore.currentPage)
  }

  get previousGame(): IDailyGame | undefined {
    return this.appStore.previousGame
  }

  get game(): IGame | undefined {
    if (this.appStore.isPlayingDailyGame) {
      return this.dailyGame
    }

    if (this.appStore.isPlayingCampaignGame) {
      return this.campaignGame
    }

    if (this.appStore.isPlayingTutorialGame) {
      return this.tutorialGame
    }

    if (this.appStore.isPlayingPreviousGame) {
      return this.previousGame
    }

    return undefined
  }
  
  _shopLetters: Letter[] = []
  get shopLetters(): LetterInstance[] {
    return this._shopLetters.map(letter => {
      return new LetterInstance(letter)
    })
  }

  _inventory: Letter[] = []
  get inventory(): LetterInstance[] { 
    return this._inventory.map(letter => {
      return new LetterInstance(letter)
    })
  }

  _secretShopLetters: Letter[] = []
  get secretShopLetters(): LetterInstance[] {
    if (!this.appStore.player?.isMember) {
      return []
    }

    return this._secretShopLetters.map(letter => {
      return new LetterInstance(letter)
    })
  }
  
  playerWordData: LetterInstance[] = []
  
  get playerWord(): LetterInstance[] {
    return Array.from(this.playerWordData).sort((a, b) => {
      return (a.position || 0) - (b.position || 0)
    })
  }

  get playerWordFull(): Array<LetterInstance | undefined> {
    const lastLetter = this.playerWord[this.playerWord.length - 1]
    return [...new Array(lastLetter?.position === undefined ? 0 : lastLetter.position + 1)].map((_, index) => {
      return this.playerWord.find(letter => letter.position === index)
    })
  }
  
  get totalMoney(): number {
    let money = this.game?.money || 0
    if (this.appStore.isPlayingCampaignGame && this.appStore.player?.funding) {
      money += this.appStore.player.funding
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
    if (this.playerWord.some(letter => letter.isWild && !letter.char)) {
      return false
    }
    return true
  }
  
  get wordPoints() {
    const sortedWord = Array.from(this.playerWord).sort((a, b) => {
      return (a.position || 0) - (b.position || 0)
    })
    
    return sortedWord.reduce((sum, letter) => {
      const basePoints = letter.points
      let abilityPoints = 0
      if (getAbilityIsActive(this.playerWordFull, letter.position!, this.appStore.player)) {
        abilityPoints = getAbilityPoints(this.playerWordFull, letter.position!, this.appStore.player)
      }
      return sum + basePoints + abilityPoints
    }, 0)
  }

  get wordLetters() {
    return this.playerWord.map(letter => letter.char)
  }
  
  get target(): number | undefined {
    return this.appStore.isPlayingTutorialGame ? this.tutorialGame?.target : this.dailyGame?.target
  }
  
  get secretTarget(): number | undefined {
    return this.dailyGame?.secretTarget
  }
  
  validWordTimeout: number | undefined
  isValidText: string | undefined
  _bestWord: string | undefined
  bestWordScore: number | undefined
  bestLetters: IRawLetter[] | undefined

  get bestWord() {
    if (!this._bestWord) {
      return ''
    }

    return this._bestWord.slice(0, 1).toUpperCase() + this._bestWord.slice(1) 
  }
  
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
      ...this.playerWord.filter(otherLetter => otherLetter.id !== letter.id && (letter.position === undefined || otherLetter.position !== letter.position)),
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
      this.playerWordData = this.playerWord.filter(otherLetter => otherLetter.id !== letter.id)
      letter.parent.onUnplaceLetter()
    }
  }

  onClickLetter = (letter: LetterInstance) => {
    if (letter.isWild) {
      setTimeout(() => {
        // check whether letter has been removed
        if (this.playerWord.some(otherLetter => otherLetter.id === letter.id)) {
          const newValue = prompt('Enter a letter')
          letter.setWildLetter(newValue || '')
        }
      }, 300)
    }
  }

  onQuickAddLetter = (letter: LetterInstance) => {
    let nextPosition = 0
    for (let i = 0; i < this.playerWord.length; i++) {
      if (this.playerWord.some(otherLetter => otherLetter.position === i)) {
        nextPosition++
      } else {
        break
      }
    }

    this.onDropLetter(letter, nextPosition)
  }

  onQuickRemoveLetter = (letter: LetterInstance) => {
    this.onDropLetterOutside(letter)
  }

  onClear = () => {
    this.playerWordData = []
  }

  reinstateBestWord = () => {
    if (this.bestLetters) {
      const letters = [
        ...this._shopLetters,
        ...this._inventory,
        ...this._secretShopLetters
      ]

      this.playerWordData = convertWordToLetterInstances(this.bestLetters, letters)
    }
  }

  getIsLetterUsed = (letter: LetterInstance) => {
    return this.playerWord.some(wordLetter => wordLetter.parent.id === letter.parent.id)
  }
}