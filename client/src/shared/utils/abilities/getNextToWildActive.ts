import { ILetter } from '../../datamodels'
import { Abilities } from '../../enums'

export const getIsNextToWildActive = (word: Array<ILetter | undefined>, position: number): boolean => {
  if (position > 0) {
    const letterBefore = word[position - 1]
    if (letterBefore && letterBefore.ability === Abilities.Wild) {
      return true
    }
  }

  if (position < word.length - 1) {
    const letterAfter = word[position + 1]
    if (letterAfter && letterAfter.ability === Abilities.Wild) {
      return true
    }
  }

  return false
}