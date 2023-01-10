import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { getAppData } from '../api/getAppData'
import { Pages } from '../models'
import { getDateFromString, IAppData, IDailyGame } from '../shared'
import { IRawLetter } from '../shared/datamodels/IRawLetter'
import { cacheAppData } from '../utils/cacheAppData'
import { loadCachedGameData } from '../utils/loadCachedGameData'

export class AppStore {
  constructor() {
    makeObservable(this, {
      currentPage: observable,
      isPlayingDailyGame: computed,
      startDailyGame: action,
      returnToMenu: action,
      isPlayingCampaignGame: computed,
      startCampaignGame: action,
      _appData: observable,
      isLoading: observable,
      isError: observable,
      isPlayingTutorialGame: computed,
      startTutorialGame: action,
      setTutorialGame: action,
      gameId: computed,
      tutorialGameInProgress: computed,
      offlineMode: observable,
      isPreviousGamesMenuOpen: computed,
      openPreviousGamesMenu: action,
      startPreviousGame: action,
      previousGame: observable,
      isPlayingPreviousGame: computed,
      cachedGameDates: observable,
      cachedGames: observable,
      cachedScores: observable,
      cachedWords: observable,
      loadCachedGameData: action
    })
  }

  _appData: IAppData | undefined

  isLoading: boolean = true
  isError: boolean = false

  offlineMode: boolean = false

  get userId() {
    return this._appData?.userId
  }

  get dateString() {
    return this._appData?.date
  }

  get gameId(): string | undefined {
    if (this.isPlayingDailyGame) {
      return this.dateString
    }

    if (this.isPlayingCampaignGame) {
      return this.dateString
    }

    if (this.isPlayingTutorialGame) {
      return 'intro-' + this.tutorialGameInProgress
    }

    if (this.isPlayingPreviousGame) {
      return this.previousGame?.date
    }

    return undefined
  }

  get today() {
    return this.dateString ? getDateFromString(this.dateString) : new Date()
  }

  get dailyGame() {
    return this._appData?.dailyGame
  }

  get campaignGame() {
    return this._appData?.campaignGame
  }

  previousGame: IDailyGame | undefined = undefined

  get player() {
    return this._appData?.player
  }
  
  fetchingAppData: boolean = true

  loadAppData = async () => {
    const userId = window.localStorage.getItem('userId')
    try {
      const appData = await getAppData(userId || undefined)
      runInAction(() => {
        this._appData = appData
        this.fetchingAppData = false
      })
      window.localStorage.setItem('userId', appData.userId)
      cacheAppData(appData)
    } catch (error) {
      runInAction(() => {
        this.isError = true
        this.offlineMode = true
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  currentPage: Pages = Pages.menu

  get isPlayingDailyGame() {
    return this.currentPage === Pages.dailyGame
  }

  get isPlayingCampaignGame() {
    return this.currentPage === Pages.campaignGame
  }

  get isPlayingTutorialGame() {
    return this.currentPage === Pages.tutorialGame1
      || this.currentPage === Pages.tutorialGame2
      || this.currentPage === Pages.tutorialGame3
  }

  get isPlayingPreviousGame() {
    return this.currentPage === Pages.previousGame
  }

  get tutorialGameInProgress(): number {
    switch (this.currentPage) {
      case Pages.tutorialGame1: return 1
      case Pages.tutorialGame2: return 2
      case Pages.tutorialGame3: return 3
      default: return 0
    }
  }

  startDailyGame = () => {
    this.currentPage = Pages.dailyGame
  }

  startCampaignGame = () => {
    this.currentPage = Pages.campaignGame
  }

  startTutorialGame = () => {
    this.currentPage = Pages.tutorialGame1
  }

  setTutorialGame = (num: number) => {
    if (num === 1) {
      this.currentPage = Pages.tutorialGame1
    } else if (num === 2) {
      this.currentPage = Pages.tutorialGame2
    } else if (num === 3) {
      this.currentPage = Pages.tutorialGame3
    }
  }

  returnToMenu = () => {
    this.currentPage = Pages.menu
  }

  get isPreviousGamesMenuOpen() {
    return this.currentPage === Pages.previousGamesMenu
  }

  openPreviousGamesMenu = () => {
    this.currentPage = Pages.previousGamesMenu
  }

  startPreviousGame = (game: IDailyGame) => {
    this.previousGame = game
    this.currentPage = Pages.previousGame
  }

  cachedGameDates: string[] | undefined = undefined
  cachedGames: Map<string, IDailyGame> = new Map()
  cachedWords: Map<string, IRawLetter[]> = new Map()
  cachedScores: Map<string, number> = new Map()

  loadCachedGameData = () => {
    this.cachedGameDates = undefined
    const cachedGameData = loadCachedGameData()
    if (cachedGameData) {
      runInAction(() => {
        this.cachedGameDates = cachedGameData.dates
        this.cachedGames = cachedGameData.games
        this.cachedWords = cachedGameData.words
        this.cachedScores = cachedGameData.scores
      })
    }
  }
}