import nextToVowel from '../images/next_to_vowel.png';
import notNextToVowel from '../images/not_next_to_vowel.png';
import otherInPosition1 from '../images/other_in_position_1.png';
import otherInPosition2 from '../images/other_in_position_2.png';
import otherInPosition3 from '../images/other_in_position_3.png';
import inPosition1 from '../images/position_1.png';
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
  const images = [otherInPosition1, otherInPosition2, otherInPosition3]
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
  const images = [inPosition1]
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
  const images = [inPosition1] // todo
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
  const images = [inPosition1] // todo
  const text = points === 1 ? `scores 1 extra point if word is at least ${length} letters long` : `scores ${points} extra points if word is at least ${length} letters long`
  return {
    id: String(nextAbilityId++),
    image: images[length - 3],
    text,
    points,
    getIsActive: createIsMinWordLength(length),
    getPoints: () => points
  }
}

export const getMaxWordLengthAbility = (points: number, length: number): Ability => {
  const images = [inPosition1] // todo
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