import { action, makeObservable, observable, runInAction } from 'mobx';

import { ScoreInfo } from '../models';
import { getDailyGame } from '../utils/getDailyGame';
import { getDateString } from '../utils/getDateString';

export class AppStore {
  constructor() {
    makeObservable(this, {
      playerName: observable,
      playerId: observable,
      completedTutorial: observable,
      loadPlayer: action,
      isPlayingDailyGame: observable,
      isPlayingRandomGame: observable,
      startDailyGame: action,
      startRandomGame: action,
      returnToMenu: action,
      dailyGameInProgress: observable,
      goToPreviousDailyGame: action,
      goToNextDailyGame: action,
      isDevMode: observable,
      toggleDevMode: action,
      isShowingCalendar: observable,
      toggleIsShowingCalendar: action,
      scoreMap: observable,
      loadMonthScores: action,
      isPlayingCampaignGame: observable,
      campaignInProgress: observable,
      campaignDayInProgress: observable,
      startCampaignGame: action
    })
  }

  isDevMode: boolean = false;

  playerId: string = ""
  playerName: string = ""
  completedTutorial: boolean = false

  loadPlayer = () => {
    const playerId = window.localStorage.getItem("playerId")
    if (!playerId) {
      this.createPlayer();
      return;
    }

    this.playerId = playerId
    this.playerName = window.localStorage.getItem("playerName") || ""
    this.completedTutorial = Boolean(window.localStorage.getItem("completedTutorial"))
  }

  createPlayer = () => {
    const playerName = prompt("Please choose a name")
    if (!playerName) {
      this.createPlayer();
      return;
    }

    runInAction(() => {
      this.playerName = playerName;
      const playerId = Math.random() * Math.pow(10, 16)
      this.playerId = String(playerId)

      window.localStorage.setItem("playerName", this.playerName)
      window.localStorage.setItem("playerId", this.playerId)
    })
  }

  isPlayingDailyGame: boolean = false
  dailyGameInProgress: Date | undefined = undefined
  isPlayingRandomGame: boolean = false
  isPlayingCampaignGame: boolean = false
  campaignInProgress: string | undefined = undefined
  campaignDayInProgress: number | undefined = undefined

  startDailyGame = () => {
    this.isPlayingDailyGame = true
    this.dailyGameInProgress = new Date();
  }

  startCampaignGame = () => {
    this.isPlayingCampaignGame = true;
    this.campaignInProgress = "1";
    this.campaignDayInProgress = 0;
  }

  startRandomGame = () => {
    this.isPlayingRandomGame = true
  }

  returnToMenu = () => {
    this.isPlayingDailyGame = false
    this.isPlayingRandomGame = false
    this.isPlayingCampaignGame = false
  }

  goToPreviousDailyGame = () => {
    if (this.dailyGameInProgress) {
      this.dailyGameInProgress = new Date(this.dailyGameInProgress.getFullYear(), this.dailyGameInProgress.getMonth(), this.dailyGameInProgress.getDate() - 1)
    }
  }

  goToNextDailyGame = () => {
    if (this.dailyGameInProgress) {
      this.dailyGameInProgress = new Date(this.dailyGameInProgress.getFullYear(), this.dailyGameInProgress.getMonth(), this.dailyGameInProgress.getDate() + 1)
    }
  }

  toggleDevMode = () => {
    this.isDevMode = !this.isDevMode
  }

  isShowingCalendar: boolean = false;

  toggleIsShowingCalendar = () => {
    this.isShowingCalendar = !this.isShowingCalendar
  }

  scoreMap: Map<string, ScoreInfo> = new Map()


  loadScore = (date: Date): ScoreInfo => {
    const game = getDailyGame(date)
      
    const dateString = getDateString(date)
    let scoreInfo: ScoreInfo

    if (game) {
      const score = window.localStorage.getItem(`${dateString}-score`)

      scoreInfo = {
        date: dateString,
        exists: true,
        attempted: !!score,
        metTarget: Number(score) >= (game.target || 0),
        metSecretTarget: Number(score) >= (game.secretTarget || 0)
      }
    } else {
      scoreInfo = {
        date: dateString,
        exists: false,
        attempted: false,
        metTarget: false,
        metSecretTarget: false
      }
    }

    this.scoreMap.set(dateString, scoreInfo)

    return scoreInfo
  }

  loadMonthScores = (date: Date) => {
    const numDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    ([...Array(numDaysInMonth)]).forEach((x, index) => {
      const newDate = new Date(date.getFullYear(), date.getMonth(), index + 1)
      this.loadScore(newDate)
    })
  }

  loadStreakScore = (date: Date = new Date()): number => {
    let currentDate = date
    let streak = 0;
    let streakEnded = false;

    while (!streakEnded) {
      const scoreInfo = this.loadScore(currentDate)
      if (scoreInfo.metTarget) {
        streak++
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1)
      } else {
        streakEnded = true
      }
    }

    return streak
  }
}