export interface ISubmitWord {
  date: string;
  userId: string;
  word: Array<{ id: string, char: string }>
}