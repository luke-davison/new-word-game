import { getDateString } from '../../../common/utils';

export const getTodayDateString = (): string => {
  return getDateString(new Date())
}