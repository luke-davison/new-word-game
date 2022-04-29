import { action, makeObservable, observable, runInAction } from 'mobx';

import { getDailyGame } from '../../api/src/games/getDailyGame';
import { getDateString } from '../../common/utils/getDateString';
import { ScoreInfo } from '../models';

export class AppStore {
  constructor() {
    makeObservable(this, {
      playerId: observable,
      completedTutorial: observable,
      loadPlayer: action,
      createPlayer: action,
      isPlayingDailyGame: observable,
      isPlayingRandomGame: observable,
      startDailyGame: action,
      startRandomGame: action,
      returnToMenu: action,
      isShowingCalendar: observable,
      toggleIsShowingCalendar: action,
      scoreMap: observable,
      loadMonthScores: action,
      isPlayingCampaignGame: observable,
      startCampaignGame: action,
      today: observable
    })
  }

  today: Date = new Date();

  playerId: string = ""
  completedTutorial: boolean = false

  loadApp = () => {
    this.loadPlayer();
  }

  loadPlayer = () => {
    const playerId = window.localStorage.getItem("playerId")
    if (!playerId) {
      this.createPlayer();
      return;
    }

    this.playerId = playerId
    this.completedTutorial = Boolean(window.localStorage.getItem("completedTutorial"))
  }

  createPlayer = () => {
    runInAction(() => {
      const playerId = Math.random() * Math.pow(10, 16)
      this.playerId = String(playerId)

      window.localStorage.setItem("playerId", this.playerId)
    })
  }

  isPlayingDailyGame: boolean = false
  isPlayingRandomGame: boolean = false
  isPlayingCampaignGame: boolean = false

  startDailyGame = () => {
    this.isPlayingDailyGame = true
  }

  startCampaignGame = () => {
    this.isPlayingCampaignGame = true;
  }

  startRandomGame = () => {
    this.isPlayingRandomGame = true
  }

  returnToMenu = () => {
    this.isPlayingDailyGame = false
    this.isPlayingRandomGame = false
    this.isPlayingCampaignGame = false
  }

  isShowingCalendar: boolean = false;

  toggleIsShowingCalendar = () => {
    this.isShowingCalendar = !this.isShowingCalendar
  }

  scoreMap: Map<string, ScoreInfo> = new Map()

  loadScore = (date: Date): ScoreInfo => {
    const dateString = getDateString(date)
    const game = getDailyGame(dateString)
      
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