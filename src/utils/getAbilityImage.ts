import clubImage from '../images/club.png';
import funding1Image from '../images/funding_1.png';
import funding2Image from '../images/funding_2.png';
import maxWordLength4Image from '../images/max_word_length_4.png';
import maxWordLength5Image from '../images/max_word_length_5.png';
import maxWordLength6Image from '../images/max_word_length_6.png';
import maxWordLength7Image from '../images/max_word_length_7.png';
import minWordLength4Image from '../images/min_word_length_4.png';
import minWordLength5Image from '../images/min_word_length_5.png';
import minWordLength6Image from '../images/min_word_length_6.png';
import minWordLength7Image from '../images/min_word_length_7.png';
import nextToVowelImage from '../images/next_to_vowel.png';
import nextToWildImage from '../images/next_to_wild.png';
import notNextToVowelImage from '../images/not_next_to_vowel.png';
import notNextToWildImage from '../images/not_next_to_wild.png';
import otherInPosition1Image from '../images/other_in_position_1.png';
import otherInPosition2Image from '../images/other_in_position_2.png';
import otherInPosition3Image from '../images/other_in_position_3.png';
import otherInPosition4Image from '../images/other_in_position_4.png';
import otherInPosition5Image from '../images/other_in_position_5.png';
import inPosition1Image from '../images/position_1.png';
import inPosition2Image from '../images/position_2.png';
import inPosition3Image from '../images/position_3.png';
import inPosition4Image from '../images/position_4.png';
import inLastPositionImage from '../images/position_last.png';
import retainImage from '../images/retain.png';
import retainLeftImage from '../images/retain_left.png';
import retainRightImage from '../images/retain_right.png';
import vowelsImage from '../images/vowel.png';
import wildImage from '../images/wild.png';
import wildsImage from '../images/wilds.png';
import wordLength4Image from '../images/word_length_must_be_4.png';
import wordLength5Image from '../images/word_length_must_be_5.png';
import wordLength6Image from '../images/word_length_must_be_6.png';
import wordLength7Image from '../images/word_length_must_be_7.png';
import { Abilities } from '../shared/enums';

export const getAbilityImage = (ability: Abilities): string | undefined => {
  switch (ability) {
    case Abilities.Club: return clubImage;
    case Abilities.Funding1: return funding1Image;
    case Abilities.Funding2: return funding2Image;
    case Abilities.InPosition1: return inPosition1Image;
    case Abilities.InPosition2: return inPosition2Image;
    case Abilities.InPosition3: return inPosition3Image;
    case Abilities.InPosition4: return inPosition4Image;
    case Abilities.InPositionLast: return inLastPositionImage;
    case Abilities.MaxWordLength4: return maxWordLength4Image;
    case Abilities.MaxWordLength5: return maxWordLength5Image;
    case Abilities.MaxWordLength6: return maxWordLength6Image;
    case Abilities.MaxWordLength7: return maxWordLength7Image;
    case Abilities.MinWordLength4: return minWordLength4Image;
    case Abilities.MinWordLength5: return minWordLength5Image;
    case Abilities.MinWordLength6: return minWordLength6Image;
    case Abilities.MinWordLength7: return minWordLength7Image;
    case Abilities.NextToVowel: return nextToVowelImage;
    case Abilities.NextToWild: return nextToWildImage;
    case Abilities.NotNextToVowel: return notNextToVowelImage;
    case Abilities.NotNextToWild: return notNextToWildImage;
    case Abilities.OtherInPosition1: return otherInPosition1Image;
    case Abilities.OtherInPosition2: return otherInPosition2Image;
    case Abilities.OtherInPosition3: return otherInPosition3Image;
    case Abilities.OtherInPosition4: return otherInPosition4Image;
    case Abilities.OtherInPosition5: return otherInPosition5Image;
    case Abilities.Retain: return retainImage;
    case Abilities.RetainLeft: return retainLeftImage;
    case Abilities.RetainRight: return retainRightImage;
    case Abilities.Vowels: return vowelsImage;
    case Abilities.Wild: return wildImage;
    case Abilities.Wilds: return wildsImage;
    case Abilities.WordLength4: return wordLength4Image;
    case Abilities.WordLength5: return wordLength5Image;
    case Abilities.WordLength6: return wordLength6Image;
    case Abilities.WordLength7: return wordLength7Image;

    default: return undefined
  }
}