import { action, makeObservable, observable, runInAction } from 'mobx';

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
      toggleDevMode: action
    })

    // this.loadPlayer();
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

  startDailyGame = () => {
    this.isPlayingDailyGame = true
    this.dailyGameInProgress = new Date();
  }

  startRandomGame = () => {
    this.isPlayingRandomGame = true
  }

  returnToMenu = () => {
    this.isPlayingDailyGame = false
    this.isPlayingRandomGame = false
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
}