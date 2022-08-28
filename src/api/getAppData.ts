import { IAppData } from '../../src/shared/datamodels'

export const getAppData = async (userId: string | undefined): Promise<IAppData> => {
  let url = '/api/start'
  if (userId) {
    url += `?userId=${userId}`
  }
  const response = await fetch(url)
  const json = await response.json()
  return json as IAppData
}