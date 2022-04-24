export interface ISubmitCampaignWord {
  date: string;
  userId: string;
  word: Array<{ id: string, char: string }>
}