import { getDateString } from "../../client/src/shared"

export const getTodayDateString = (): string => {
  return getDateString(new Date())
}