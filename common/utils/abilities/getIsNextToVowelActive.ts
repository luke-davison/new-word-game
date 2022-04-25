import { ILetter } from "../../datamodels"
import { getIsCharacterVowel } from "../getIsChararacterVowel"

export const getIsNextToVowelActive = (word: ILetter[], position: number): boolean => {
  if (position > 0) {
    const letterBefore = word[position - 1]
    if (getIsCharacterVowel(letterBefore.char)) {
      return true
    }

  }

  if (position < word.length - 1) {
    const letterAfter = word[position + 1]
    if (getIsCharacterVowel(letterAfter.char)) {
      return true
    }
  }

  return false
}