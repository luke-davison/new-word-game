import { IAppData } from '../../shared/datamodels';

export const getAppData = async (userId: string | undefined): Promise<IAppData> => {
  const response = await fetch("http://localhost:3001/api/start")
  const json = await response.json()
  console.log(json)
  return json as IAppData
}