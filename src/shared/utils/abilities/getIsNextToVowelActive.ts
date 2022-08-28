import { ILetter } from '../../datamodels'
import { getIsCharacterVowel } from '../getIsChararacterVowel'

export const getIsNextToVowelActive = (word: Array<ILetter | undefined>, position: number): boolean => {
  if (position > 0) {
    const letterBefore = word[position - 1]
    if (letterBefore && getIsCharacterVowel(letterBefore.char)) {
      return true
    }

  }

  if (position < word.length - 1) {
    const letterAfter = word[position + 1]
    if (letterAfter && getIsCharacterVowel(letterAfter.char)) {
      return true
    }
  }

  return false
}