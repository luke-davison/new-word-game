import { IGameStats, ISubmitWord } from '../shared/datamodels';

export const submitDailyWord = async (submitWord: ISubmitWord): Promise<IGameStats> => {
  const url = "/api/submit/daily"
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(submitWord),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  return json as IGameStats
}