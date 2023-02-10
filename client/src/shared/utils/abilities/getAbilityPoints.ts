import { ILetter, IPlayer } from '../../datamodels'
import { Abilities } from '../../enums'
import { getIsCharacterVowel } from '../getIsChararacterVowel'
import { getAbilityIsActive } from './getAbilityIsActive'

const copyAbilities: Abilities[] = [
  Abilities.CopyAbilityInPosition1,
  Abilities.CopyAbilityInPosition2,
  Abilities.CopyAbilityInPosition3,
  Abilities.CopyAbilityInPosition4,
  Abilities.CopyAbilityInPosition5
]

export const getAbilityPoints = (word: Array<ILetter | undefined>, position: number, player?: IPlayer): number => {
  const letter = word[position]
  if (!letter) {
    return 0
  }

  const isActive = getAbilityIsActive(word, position, player)

  if (!isActive) return 0

  switch (letter.ability) {
    case Abilities.OtherInPosition1: return word[0]?.points || 0
    case Abilities.OtherInPosition2: return word[1]?.points || 0
    case Abilities.OtherInPosition3: return word[2]?.points || 0
    case Abilities.OtherInPosition4: return word[3]?.points || 0
    case Abilities.OtherInPosition5: return word[4]?.points || 0
  }

  switch (letter.ability) {
    case Abilities.Vowels:
      return word.reduce((sum, otherLetter) => otherLetter && getIsCharacterVowel(otherLetter.char) ? sum + (letter.abilityPoints || 0) : sum, 0)
    case Abilities.Wilds:
      return word.reduce((sum, otherLetter) => otherLetter?.ability === Abilities.Wild ? sum + (letter.abilityPoints || 0) : sum, 0)
  }

  if (copyAbilities.some(ability => ability === letter.ability)) {
    let modifiedWord = Array.from(word)
    let positionToCopy = 0
    switch (letter.ability) {
      case Abilities.CopyAbilityInPosition1: positionToCopy = 0; break
      case Abilities.CopyAbilityInPosition2: positionToCopy = 1; break
      case Abilities.CopyAbilityInPosition3: positionToCopy = 2; break
      case Abilities.CopyAbilityInPosition4: positionToCopy = 3; break
      case Abilities.CopyAbilityInPosition5: positionToCopy = 4; break
    }

    const letterToUpdate = word[position] 
    const updatedLetter = letterToUpdate ? {
      ...letterToUpdate,
      ability: word[positionToCopy]?.ability,
      abilityPoints: word[positionToCopy]?.abilityPoints
    } : undefined

    modifiedWord[position] = updatedLetter

    return getAbilityPoints(modifiedWord, position, player)
  }

  return letter.abilityPoints || 0
}