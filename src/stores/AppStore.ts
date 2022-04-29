import { action, makeObservable, observable } from 'mobx';

import { getAppData } from '../api/getAppData';
import { ScoreInfo } from '../models';

export class AppStore {
  constructor() {
    makeObservable(this, {
      userId: observable,
      isPlayingDailyGame: observable,
      isPlayingRandomGame: observable,
      startDailyGame: action,
      startRandomGame: action,
      returnToMenu: action,
      isShowingCalendar: observable,
      toggleIsShowingCalendar: action,
      scoreMap: observable,
      isPlayingCampaignGame: observable,
      startCampaignGame: action,
      today: observable
    })
  }

  today: Date = new Date();

  userId: string = ""
  fetchingAppData: boolean = true

  loadAppData = () => {
    const userId = window.localStorage.getItem("userId")
    getAppData(userId || undefined)
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
}