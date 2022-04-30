export const getDateString = (date: Date): string => {
  return `${String(date.getFullYear()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export const getDateFromString = (str: string): Date => {
  const [year, month, date] = str.split("-")
  return new Date(Number(year), Number(month) - 1, Number(date))
}