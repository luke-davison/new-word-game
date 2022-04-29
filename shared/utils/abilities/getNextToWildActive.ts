import { ILetter } from "../../datamodels"
import { Abilities } from "../../enums"

export const getIsNextToWildActive = (word: ILetter[], position: number): boolean => {
  if (position > 0) {
    const letterBefore = word[position - 1]
    if (letterBefore.ability === Abilities.Wild) {
      return true
    }

  }

  if (position < word.length - 1) {
    const letterAfter = word[position + 1]
    if (letterAfter.ability === Abilities.Wild) {
      return true
    }
  }

  return false
}