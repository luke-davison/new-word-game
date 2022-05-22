export interface ScoreInfo {
  date: string;
  exists: boolean;
  attempted: boolean;
  metTarget: boolean;
  metSecretTarget: boolean;
}

export enum Pages {
  menu,
  dailyGame,
  campaignGame,
  tutorialGame1,
  tutorialGame2,
  tutorialGame3,
  previousGamesMenu,
  previousGame
}