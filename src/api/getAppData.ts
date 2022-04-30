import { IAppData } from '../../src/shared/datamodels';

export const getAppData = async (userId: string | undefined): Promise<IAppData> => {
  const response = await fetch("/api/start")
  const json = await response.json()
  console.log(json)
  return json as IAppData
}