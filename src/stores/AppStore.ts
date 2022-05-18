import { action, makeObservable, observable, runInAction } from 'mobx';

import { getAppData } from '../api/getAppData';
import { ScoreInfo } from '../models';
import { getDateFromString, IAppData } from '../shared';
import { cacheAppData } from '../utils/cacheAppData';

export class AppStore {
  constructor() {
    makeObservable(this, {
      isPlayingDailyGame: observable,
      startDailyGame: action,
      returnToMenu: action,
      isShowingCalendar: observable,
      toggleIsShowingCalendar: action,
      scoreMap: observable,
      isPlayingCampaignGame: observable,
      startCampaignGame: action,
      _appData: observable
    })
  }

  _appData: IAppData | undefined

  get userId() {
    return this._appData?.userId
  }

  get dateString() {
    return this._appData?.date
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

  get player() {
    return this._appData?.player
  }

  fetchingAppData: boolean = true

  loadAppData = async () => {
    const userId = window.localStorage.getItem("userId")
    const appData = await getAppData(userId || undefined)
    runInAction(() => {
      this._appData = appData
      this.fetchingAppData = false
    })
    window.localStorage.setItem("userId", appData.userId)
    cacheAppData(appData)
  }


  isPlayingDailyGame: boolean = false
  isPlayingCampaignGame: boolean = false

  startDailyGame = () => {
    this.isPlayingDailyGame = true
  }

  startCampaignGame = () => {
    this.isPlayingCampaignGame = true;
  }

  returnToMenu = () => {
    this.isPlayingDailyGame = false
    this.isPlayingCampaignGame = false
  }

  isShowingCalendar: boolean = false;

  toggleIsShowingCalendar = () => {
    this.isShowingCalendar = !this.isShowingCalendar
  }

  scoreMap: Map<string, ScoreInfo> = new Map()
}