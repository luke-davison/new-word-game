import { getDateString } from '../../../src/shared/utils';

export const getTodayDateString = (): string => {
  return getDateString(new Date())
}