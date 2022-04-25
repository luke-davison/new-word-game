import { Abilities } from "../../enums"
import { ILetter, IPlayer } from "../../datamodels"
import { getIsCharacterVowel } from "../getIsChararacterVowel"
import { getAbilityIsActive } from "./getAbilityIsActive"

export const getAbilityPoints = (word: ILetter[], position: number, player?: IPlayer): number => {
  const letter = word[position]
  if (!letter) {
    return 0
  }

  const isActive = getAbilityIsActive(word, position, player)

  if (!isActive) return 0

  switch (letter.ability) {
    case Abilities.OtherInPosition1: return word[0]?.points || 0;
    case Abilities.OtherInPosition2: return word[1]?.points || 0;
    case Abilities.OtherInPosition3: return word[2]?.points || 0;
    case Abilities.OtherInPosition4: return word[3]?.points || 0;
    case Abilities.OtherInPosition5: return word[4]?.points || 0;
  }

  switch (letter.ability) {
    case Abilities.Vowels:
      return word.reduce((sum, letter) => getIsCharacterVowel(letter.char) ? sum + (letter.abilityPoints || 0) : sum, 0);
    case Abilities.Wilds:
      return word.reduce((sum, letter) => letter.ability === Abilities.Wild ? sum + (letter.abilityPoints || 0) : sum, 0);
  }

  return letter.abilityPoints || 0;
}