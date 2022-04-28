export interface ILeague {
  id: string;
  rank: number;
  scores: Array<{ nickname: string, score: number }>,
  previousScores?: Array<{ nickname: string, score: number }>
}