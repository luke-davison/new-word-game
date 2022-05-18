import { Abilities } from "../../enums"
import { ILetter, IPlayer } from "../../datamodels"
import { getIsNextToVowelActive } from "./getIsNextToVowelActive"
import { getIsNextToWildActive } from "./getNextToWildActive"
import { getVowelsActive } from "./getVowelsActive"
import { getWildsActive } from "./getWildsActive"
import { getIsAnotherAbilityInPosition } from "./getIsAnotherAbilityInPosition"

export const getAbilityIsActive = (word: Array<ILetter | undefined>, position: number, player?: IPlayer): boolean => {
  const letter = word[position]
  if (!letter) {
    return false
  }

  switch (letter.ability) {
    case Abilities.Club: return !player?.isMember;
    case Abilities.CopyAbilityInPosition1: return getIsAnotherAbilityInPosition(word, 0);
    case Abilities.CopyAbilityInPosition2: return getIsAnotherAbilityInPosition(word, 1);
    case Abilities.CopyAbilityInPosition3: return getIsAnotherAbilityInPosition(word, 2);
    case Abilities.CopyAbilityInPosition4: return getIsAnotherAbilityInPosition(word, 3);
    case Abilities.CopyAbilityInPosition5: return getIsAnotherAbilityInPosition(word, 4);
    case Abilities.Funding1: return true;
    case Abilities.Funding2: return true;
    case Abilities.InPosition1: return position === 0;
    case Abilities.InPosition2: return position === 1;
    case Abilities.InPosition3: return position === 2;
    case Abilities.InPosition4: return position === 3;
    case Abilities.InPositionLast: return position === word.length - 1;
    case Abilities.MaxWordLength4: return word.length <= 4;
    case Abilities.MaxWordLength5: return word.length <= 5;
    case Abilities.MaxWordLength6: return word.length <= 6;
    case Abilities.MaxWordLength7: return word.length <= 7;
    case Abilities.MinWordLength4: return word.length >= 4;
    case Abilities.MinWordLength5: return word.length >= 5;
    case Abilities.MinWordLength6: return word.length >= 6;
    case Abilities.MinWordLength7: return word.length >= 7;
    case Abilities.NextToVowel: return getIsNextToVowelActive(word, position);
    case Abilities.NextToWild: return getIsNextToWildActive(word, position)
    case Abilities.NotNextToVowel: return !getIsNextToVowelActive(word, position);
    case Abilities.NotNextToWild: return !getIsNextToWildActive(word, position);
    case Abilities.OtherInPosition1: return word.length >= 1;
    case Abilities.OtherInPosition2: return word.length >= 2;
    case Abilities.OtherInPosition3: return word.length >= 3;
    case Abilities.OtherInPosition4: return word.length >= 4;
    case Abilities.OtherInPosition5: return word.length >= 5;
    case Abilities.Retain: return true;
    case Abilities.RetainLeft: return position > 0;
    case Abilities.RetainRight: return position < word.length - 1;
    case Abilities.Vowels: return getVowelsActive(word);
    case Abilities.Wild: return true;
    case Abilities.Wilds: return getWildsActive(word);
    case Abilities.WordLength4: return word.length === 4;
    case Abilities.WordLength5: return word.length === 5;
    case Abilities.WordLength6: return word.length === 6;
    case Abilities.WordLength7: return word.length === 7;

    default: return false
  }
}