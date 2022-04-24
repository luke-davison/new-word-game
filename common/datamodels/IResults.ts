export interface IResults {
  startDate: string;
  inProgress: boolean;
  players: IPlayerResult[]
}

export interface IPlayerResult {
  playerName: string;
  score: number;
}