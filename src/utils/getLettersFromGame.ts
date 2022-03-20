import { Abilities, Ability, Game, RawLetter, ShopLetter } from '../models';
import {
    getDoubleOtherLetterAbility, getInLastPosition, getInPositionAbility, getMaxWordLengthAbility,
    getMinWordLengthAbility, getNextToVowelAbility, getNextToWildAbility, getNotNextToVowelAbility,
    getPointsPerVowelAbility, getPointsPerWildAbility
} from './getAbilities';

export const getLettersFromGame = (game: Game): ShopLetter[] => {
  return game.letters.map((letter, index) => {
    return {
      id: letter.letter + String(index),
      letter: letter.letter,
      color: index + 1,
      price: letter.price,
      points: letter.points,
      ability: getAbilityFromRawLetter(letter)
    }
  })
}

export const getAbilityFromRawLetter = (rawLetter: RawLetter): Ability | undefined => {
  const { ability, abilityPoints = 1} = rawLetter
  switch (ability) {
    case Abilities.InPosition1: return getInPositionAbility(abilityPoints, 0);
    case Abilities.InPosition2: return getInPositionAbility(abilityPoints, 1);
    case Abilities.InPosition3: return getInPositionAbility(abilityPoints, 2);
    case Abilities.InPosition4: return getInPositionAbility(abilityPoints, 3);
    case Abilities.InPositionLast: return getInLastPosition(abilityPoints);
    case Abilities.MaxWordLength4: return getMaxWordLengthAbility(abilityPoints, 4);
    case Abilities.MaxWordLength5: return getMaxWordLengthAbility(abilityPoints, 5);
    case Abilities.MaxWordLength6: return getMaxWordLengthAbility(abilityPoints, 6);
    case Abilities.MaxWordLength7: return getMaxWordLengthAbility(abilityPoints, 7);
    case Abilities.MinWordLength4: return getMinWordLengthAbility(abilityPoints, 4);
    case Abilities.MinWordLength5: return getMinWordLengthAbility(abilityPoints, 5);
    case Abilities.MinWordLength6: return getMinWordLengthAbility(abilityPoints, 6);
    case Abilities.MinWordLength7: return getMinWordLengthAbility(abilityPoints, 7);
    case Abilities.NextToVowel: return getNextToVowelAbility(abilityPoints);
    case Abilities.NextToWild: return getNextToWildAbility(abilityPoints);
    case Abilities.NotNextToVowel: return getNotNextToVowelAbility(abilityPoints);
    case Abilities.OtherInPosition1: return getDoubleOtherLetterAbility(0);
    case Abilities.OtherInPosition2: return getDoubleOtherLetterAbility(1);
    case Abilities.OtherInPosition3: return getDoubleOtherLetterAbility(2);
    case Abilities.OtherInPosition4: return getDoubleOtherLetterAbility(3);
    case Abilities.OtherInPosition5: return getDoubleOtherLetterAbility(4);
    case Abilities.OtherInPositionLast: return undefined; // todo
    case Abilities.Vowels: return getPointsPerVowelAbility(abilityPoints);
    case Abilities.Wilds: return getPointsPerWildAbility(abilityPoints);
    default: return undefined;
  }
}