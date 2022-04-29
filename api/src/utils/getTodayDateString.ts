import { getDateString } from '../../../shared/utils';

export const getTodayDateString = (): string => {
  return getDateString(new Date())
}