import { Abilities } from '../shared/enums'

export const getAbilityText = (ability: Abilities): string => {
  switch (ability) {
    case Abilities.Club: return 'Join the secret club.  Gain access to the secret letter store'
    case Abilities.CopyAbilityInPosition1: return 'Uses / scores the ability of the letter in position one (cannot copy wild)'
    case Abilities.CopyAbilityInPosition2: return 'Uses / scores the ability of the letter in position two (cannot copy wild)'
    case Abilities.CopyAbilityInPosition3: return 'Uses / scores the ability of the letter in position three (cannot copy wild)'
    case Abilities.CopyAbilityInPosition4: return 'Uses / scores the ability of the letter in position four (cannot copy wild)'
    case Abilities.CopyAbilityInPosition5: return 'Uses / scores the ability of the letter in position five (cannot copy wild)'
    case Abilities.Funding1: return 'Gain one extra money to use in every following game'
    case Abilities.Funding2: return 'Gain two extra money to use in every following game'
    case Abilities.InPosition1: return 'Score extra points if this letter is in the first position'
    case Abilities.InPosition2: return 'Score extra points if this letter is in the second position'
    case Abilities.InPosition3: return 'Score extra points if this letter is in the third position'
    case Abilities.InPosition4: return 'Score extra points if this letter is in the fourth position'
    case Abilities.InPositionLast: return 'Score extra points if this letter is in the last position'
    case Abilities.MaxWordLength4: return 'Score extra points if the word is no more than four letters long'
    case Abilities.MaxWordLength5: return 'Score extra points if the word is no more than five letters long'
    case Abilities.MaxWordLength6: return 'Score extra points if the word is no more than six letters long'
    case Abilities.MaxWordLength7: return 'Score extra points if the word is no more than seven letters long'
    case Abilities.MinWordLength4: return 'Score extra points if the word is at least four letters long'
    case Abilities.MinWordLength5: return 'Score extra points if the word is at least five letters long'
    case Abilities.MinWordLength6: return 'Score extra points if the word is at least six letters long'
    case Abilities.MinWordLength7: return 'Score extra points if the word is at least seven letters long'
    case Abilities.NextToVowel: return 'Score extra points if this letter is next to a vowel'
    case Abilities.NextToWild: return 'Score extra points if this letter is next to a wild'
    case Abilities.NotNextToVowel: return 'Score extra points if this letter is not next to a vowel'
    case Abilities.NotNextToWild: return 'Score extra points if this letter is not next to a wild'
    case Abilities.OtherInPosition1: return 'Re-score the base points of the letter in position one'
    case Abilities.OtherInPosition2: return 'Re-score the base points of the letter in position two'
    case Abilities.OtherInPosition3: return 'Re-score the base points of the letter in position three'
    case Abilities.OtherInPosition4: return 'Re-score the base points of the letter in position four'
    case Abilities.OtherInPosition5: return 'Re-score the base points of the letter in position five'
    case Abilities.Retain: return 'Retain this letter to use in every following game'
    case Abilities.RetainLeft: return "Retain the letter to this letter's left to use in a following game"
    case Abilities.RetainRight: return "Retain the letter to this letter's right to use in a following game"
    case Abilities.Vowels: return 'Score extra points for every vowel in the word'
    case Abilities.Wild: return 'Can be set as any letter'
    case Abilities.Wilds: return 'Score extra points for every wild in the word'
    case Abilities.WordLength4: return 'Score extra points if the word is exactly four letters long'
    case Abilities.WordLength5: return 'Score extra points if the word is exactly five letters long'
    case Abilities.WordLength6: return 'Score extra points if the word is exactly six letters long'
    case Abilities.WordLength7: return 'Score extra points if the word is exactly seven letters long'

    default: return ''
  }
}