import { ILetter } from "../../datamodels"
import { Abilities } from "../../enums"

const abilitiesThatCannotBeCopied: Abilities[] = [
  Abilities.Club,
  Abilities.CopyAbilityInPosition1,
  Abilities.CopyAbilityInPosition2,
  Abilities.CopyAbilityInPosition3,
  Abilities.CopyAbilityInPosition4,
  Abilities.CopyAbilityInPosition5,
  Abilities.Wild
]

export const getIsAnotherAbilityInPosition = (word: Array<ILetter | undefined>, otherPosition: number): boolean => {
  if (word.length <= otherPosition) {
    return false
  }

  const letterInPosition = word[otherPosition]

  if (!letterInPosition || !letterInPosition.ability) {
    return false
  }

  if (abilitiesThatCannotBeCopied.some(ability => letterInPosition.ability === ability)) {
    return false
  }

  return true
}