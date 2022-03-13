import { Ability, ShopLetter } from '../models';
import nextToVowel from './next_to_vowel.png';
import notNextToVowel from './not_next_to_vowel.png';
import otherInPosition1 from './other_in_position_1.png';
import otherInPosition2 from './other_in_position_2.png';
import otherInPosition3 from './other_in_position_3.png';
import inPosition1 from './position_1.png';

const isCharacterVowel = (str: string) => {
  return str === "a" || str === "e" || str === "i" || str === "o" || str === "u"
}

const isLetterNextToVowel = (word: ShopLetter[], position: number): boolean => {
  if (position > 0) {
    const leftLetter = word[position - 1];
    if (isCharacterVowel(leftLetter.letter)) {
      return true
    }
  }

  if (position < word.length - 1) {
    const rightLetter = word[position + 1];
    if (isCharacterVowel(rightLetter.letter)) {
      return true
    }
  }

  return false
}

const isLetterNotNextToVowel = (word: ShopLetter[], position: number): boolean => {
  return !isLetterNextToVowel(word, position)
}

const createGetLetterPoints = (position: number) => (word: ShopLetter[]) => {
  return word[position].points
}

const createIsAnyLetterInPosition = (otherPosition: number) => (word: ShopLetter[]) => {
  return word.length >= otherPosition
}

const createIsLetterInPosition = (otherPosition: number) => (word: ShopLetter[], position: number) => {
  return otherPosition === position
}

let nextAbilityId = 1;

export const getNextToVowelAbility = (points: number): Ability => {
  const text = points === 1 ? "scores 1 extra point if letter is next to a vowel" : `scores ${points} extra points if letter is next to a vowel`
  return {
    id: String(nextAbilityId++),
    image: nextToVowel,
    text,
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
    getIsActive: createIsLetterInPosition(position),
    getPoints: () => points
  }
}