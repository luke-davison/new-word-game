import { IPlayer, ISubmitWord } from '../shared/datamodels';

export const submitCampaignWord = async (submitWord: ISubmitWord): Promise<IPlayer> => {
  const url = "/api/submit/campaign"
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(submitWord),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  return json as IPlayer
}