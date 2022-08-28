import { LetterInstance } from '../../models/LetterInstance'
import { getIsWordInWordlist } from './getIsWordInWordlist'

export const getIsValidWord = (word: LetterInstance[]): boolean => {
  const highestPosition = word.reduce((high, letter) => {
    const { position = 0 } = letter
    return position > high ? position : high
  }, 0)
  if (highestPosition > word.length - 1) {
    return false
  }

  if (word.some((letter) => letter.isWild && !letter.char)) {
    return false
  }

  const str = word.reduce((str: string, letter) => str + letter.char, "")
  return getIsWordInWordlist(str)
}
