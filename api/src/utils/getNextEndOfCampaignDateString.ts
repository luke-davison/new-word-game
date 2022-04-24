import { getDateString } from "../../../common/utils"

export const getNextEndOfCampaignDateString = (date: Date) => {
  const dayOfWeek = date.getDay()
  const endOfWeekDate = new Date(date.getTime())
  endOfWeekDate.setDate(date.getDate() + 6 - dayOfWeek)
  return getDateString(endOfWeekDate)
}