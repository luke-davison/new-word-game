import maxWordLength4 from '../images/max_word_length_4.png';
import maxWordLength5 from '../images/max_word_length_5.png';
import maxWordLength6 from '../images/max_word_length_6.png';
import maxWordLength7 from '../images/max_word_length_7.png';
import minWordLength4 from '../images/min_word_length_4.png';
import minWordLength5 from '../images/min_word_length_5.png';
import minWordLength6 from '../images/min_word_length_6.png';
import minWordLength7 from '../images/min_word_length_7.png';
import nextToVowel from '../images/next_to_vowel.png';
import notNextToVowel from '../images/not_next_to_vowel.png';
import otherInPosition1 from '../images/other_in_position_1.png';
import otherInPosition2 from '../images/other_in_position_2.png';
import otherInPosition3 from '../images/other_in_position_3.png';
import otherInPosition4 from '../images/other_in_position_4.png';
import otherInPosition5 from '../images/other_in_position_5.png';
import inPosition1 from '../images/position_1.png';
import inPosition2 from '../images/position_2.png';
import inPosition3 from '../images/position_3.png';
import inPosition4 from '../images/position_4.png';
import inLastPosition from '../images/position_last.png';
import vowel from '../images/vowel.png';
import wordLength4 from '../images/word_length_must_be_4.png';
import wordLength5 from '../images/word_length_must_be_5.png';
import wordLength6 from '../images/word_length_must_be_6.png';
import wordLength7 from '../images/word_length_must_be_7.png';
import { Ability, ShopLetter } from '../models';

const isCharacterVowel = (str: string) => {
  return str === "a" || str === "e" || str === "i" || str === "o" || str === "u"
}

const isLetterNextToVowel = (word: ShopLetter[], position: number): boolean => {
  const leftLetter = word.find((wordLetter) => wordLetter.position === position - 1)
  if (leftLetter && isCharacterVowel(leftLetter.letter)) {
    return true
  }

  const rightLetter = word.find((wordLetter) => wordLetter.position === position + 1)
  if (rightLetter && isCharacterVowel(rightLetter.letter)) {
    return true
  }

  return false
}

const isLetterinLastPosition = (word: ShopLetter[], position: number): boolean => {
  return position === word.length - 1
}

const isLetterNotNextToVowel = (word: ShopLetter[], position: number): boolean => {
  return !isLetterNextToVowel(word, position)
}

const createGetLetterPoints = (position: number) => (word: ShopLetter[]) => {
  return word.find((wordLetter) => wordLetter.position === position)?.points || 0
}

const createIsAnyLetterInPosition = (otherPosition: number) => (word: ShopLetter[]) => {
  return word.some((wordLetter) => wordLetter.position === otherPosition)
}

const createIsLetterInPosition = (otherPosition: number) => (word: ShopLetter[], position: number) => {
  return otherPosition === position
}

const createIsWordLength = (length: number) => (word: ShopLetter[]) => {
  return word.length === length
}

const createIsMinWordLength = (length: number) => (word: ShopLetter[]) => {
  return word.length >= length
}

const createIsMaxWordLength = (length: number) => (word: ShopLetter[]) => {
  return word.length <= length
}

const isWordHasVowels = (word: ShopLetter[]) => {
  return word.some(letter => isCharacterVowel(letter.letter))
}

const createGetPointsPerVowel = (points: number) => (word: ShopLetter[]) => {
  const numVowels = word.reduce((sum, letter) => {
    if (isCharacterVowel(letter.letter)) {
      return sum + 1
    }
    return sum
  }, 0)

  return numVowels * points
}

let nextAbilityId = 1;

export const getNextToVowelAbility = (points: number): Ability => {
  const text = points === 1 ? "scores 1 extra point if letter is next to a vowel" : `scores ${points} extra points if letter is next to a vowel`
  return {
    id: String(nextAbilityId++),
    image: nextToVowel,
    text,
    points,
    getIsActive: isLetterNextToVowel,
    getPoints: () => points
  }
}

export const getNotNextToVowelAbility = (points: number): Ability => {
  const text = points === 1 ? "scores 1 extra point if letter is not next to a vowel" : `scores ${points} extra points if letter is not next to a vowel`
  return {
    id: String(nextAbilityId++),
    image: notNextToVowel,
    text,
    points,
    getIsActive: isLetterNotNextToVowel,
    getPoints: () => points
  }
}

export const getDoubleOtherLetterAbility = (position: number): Ability => {
  const images = [otherInPosition1, otherInPosition2, otherInPosition3, otherInPosition4, otherInPosition5]
  return {
    id: String(nextAbilityId++),
    image: images[position],
    text: `doubles base points of letter in position ${position + 1}`,
    multiplier: 2,
    getIsActive: createIsAnyLetterInPosition(position),
    getPoints: createGetLetterPoints(position)
  }
}

export const getInPositionAbility = (points: number, position: number): Ability => {
  const images = [inPosition1, inPosition2, inPosition3, inPosition4]
  const text = points === 1 ? `scores 1 extra point if letter is in position ${position + 1}` : `scores ${points} extra points if letter is in position ${position + 1}`
  return {
    id: String(nextAbilityId++),
    image: images[position],
    text,
    points,
    getIsActive: createIsLetterInPosition(position),
    getPoints: () => points
  }
}

export const getWordLengthAbility = (points: number, length: number): Ability => {
  if (length < 4 || length > 7) {
    throw new Error("getWordLengthAbility length arg out of bounds " + length)
  }
  const images = [wordLength4, wordLength5, wordLength6, wordLength7]
  const text = points === 1 ? `scores 1 extra point if word is ${length} letters long` : `scores ${points} extra points if word is ${length} letters long`
  return {
    id: String(nextAbilityId++),
    image: images[length - 3],
    text,
    points,
    getIsActive: createIsWordLength(length),
    getPoints: () => points
  }
}

export const getMinWordLengthAbility = (points: number, length: number): Ability => {
  if (length < 4 || length > 7) {
    throw new Error("getMinWordLengthAbility length arg out of bounds " + length)
  }
  const images = [minWordLength4, minWordLength5, minWordLength6, minWordLength7]
  const text = points === 1 ? `scores 1 extra point if word is at least ${length} letters long` : `scores ${points} extra points if word is at least ${length} letters long`
  return {
    id: String(nextAbilityId++),
    image: images[length - 4],
    text,
    points,
    getIsActive: createIsMinWordLength(length),
    getPoints: () => points
  }
}

export const getMaxWordLengthAbility = (points: number, length: number): Ability => {
  if (length < 4 || length > 7) {
    throw new Error("getMaxWordLengthAbility length arg out of bounds " + length)
  }
  const images = [maxWordLength4, maxWordLength5, maxWordLength6, maxWordLength7]
  const text = points === 1 ? `scores 1 extra point if word is no more than ${length} letters long` : `scores ${points} extra points if word is no more than ${length} letters long`
  return {
    id: String(nextAbilityId++),
    image: images[length - 3],
    text,
    points,
    getIsActive: createIsMaxWordLength(length),
    getPoints: () => points
  }
}

export const getInLastPosition = (points: number): Ability => {
  const text = points === 1 ? "scores 1 extra point if letter is last position" : "scores ${points} extra points if letter last position"
  return {
    id: String(nextAbilityId++),
    image: inLastPosition,
    text,
    points,
    getIsActive: isLetterinLastPosition,
    getPoints: () => points
  }
}

export const getPointsPerVowelAbility = (points: number): Ability => {
  return {
    id: String(nextAbilityId++),
    image: vowel,
    text: points === 1 ? "scores 1 point for every vowel" : `scores ${points} points for every vowel`,
    points: 1,
    getIsActive: isWordHasVowels,
    getPoints: createGetPointsPerVowel(points)
  }
}