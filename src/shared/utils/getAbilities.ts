import club from '../../images/club.png';
import funding1 from '../../images/funding_1.png';
import funding2 from '../../images/funding_2.png';
import maxWordLength4 from '../../images/max_word_length_4.png';
import maxWordLength5 from '../../images/max_word_length_5.png';
import maxWordLength6 from '../../images/max_word_length_6.png';
import maxWordLength7 from '../../images/max_word_length_7.png';
import minWordLength4 from '../../images/min_word_length_4.png';
import minWordLength5 from '../../images/min_word_length_5.png';
import minWordLength6 from '../../images/min_word_length_6.png';
import minWordLength7 from '../../images/min_word_length_7.png';
import nextToVowel from '../../images/next_to_vowel.png';
import nextToWild from '../../images/next_to_wild.png';
import notNextToVowel from '../../images/not_next_to_vowel.png';
import notNextToWild from '../../images/not_next_to_wild.png';
import otherInPosition1 from '../../images/other_in_position_1.png';
import otherInPosition2 from '../../images/other_in_position_2.png';
import otherInPosition3 from '../../images/other_in_position_3.png';
import otherInPosition4 from '../../images/other_in_position_4.png';
import otherInPosition5 from '../../images/other_in_position_5.png';
import inPosition1 from '../../images/position_1.png';
import inPosition2 from '../../images/position_2.png';
import inPosition3 from '../../images/position_3.png';
import inPosition4 from '../../images/position_4.png';
import inLastPosition from '../../images/position_last.png';
import retain from '../../images/retain.png';
import retainLeft from '../../images/retain_left.png';
import retainRight from '../../images/retain_right.png';
import vowel from '../../images/vowel.png';
import wild from '../../images/wild.png';
import wilds from '../../images/wilds.png';
import wordLength4 from '../../images/word_length_must_be_4.png';
import wordLength5 from '../../images/word_length_must_be_5.png';
import wordLength6 from '../../images/word_length_must_be_6.png';
import wordLength7 from '../../images/word_length_must_be_7.png';
import { IGameAbility, Player } from '../models';
import { Letter } from '../models/Letter';
import { LetterInstance } from '../models/LetterInstance';
import { getIsCharacterVowel } from './';

const isLetterNextToVowel = (word: LetterInstance[], position: number): boolean => {
  const leftLetter = word.find((wordLetter) => wordLetter.position === position - 1)
  if (leftLetter && getIsCharacterVowel(leftLetter.char)) {
    return true
  }

  const rightLetter = word.find((wordLetter) => wordLetter.position === position + 1)
  if (rightLetter && getIsCharacterVowel(rightLetter.char)) {
    return true
  }

  return false
}

const isLetterinLastPosition = (word: LetterInstance[], position: number): boolean => {
  const highestPostiion: number = word.reduce((highest, letter) => {
    if ((letter.position || 0) > highest) {
      return letter.position!
    }
    return highest
  }, 0)
  return position === highestPostiion
}

const isLetterNotNextToVowel = (word: LetterInstance[], position: number): boolean => {
  return !isLetterNextToVowel(word, position)
}

const isLetterNotNextToWild = (word: LetterInstance[], position: number): boolean => {
  return !isLetterNextToWild(word, position)
}

const createGetLetterPoints = (position: number) => (word: LetterInstance[]) => {
  return word.find((wordLetter) => wordLetter.position === position)?.points || 0
}

const createIsAnyLetterInPosition = (otherPosition: number) => (word: LetterInstance[]) => {
  return word.some((wordLetter) => wordLetter.position === otherPosition)
}

const createIsLetterInPosition = (otherPosition: number) => (word: LetterInstance[], position: number) => {
  return otherPosition === position
}

const createIsWordLength = (length: number) => (word: LetterInstance[]) => {
  return word.length === length
}

const createIsMinWordLength = (length: number) => (word: LetterInstance[]) => {
  return word.length >= length
}

const createIsMaxWordLength = (length: number) => (word: LetterInstance[]) => {
  return word.length <= length
}

const isWordHasVowels = (word: LetterInstance[]) => {
  return word.some(letter => getIsCharacterVowel(letter.char))
}

const isWordHasWilds = (word: LetterInstance[]) => {
  return word.some(letter => letter.isWild)
}

const createGetPointsPerVowel = (points: number) => (word: LetterInstance[]) => {
  const numVowels = word.reduce((sum, letter) => {
    if (getIsCharacterVowel(letter.char)) {
      return sum + 1
    }
    return sum
  }, 0)

  return numVowels * points
}

const createGetPointsPerWild = (points: number) => (word: LetterInstance[]) => {
  const numWilds = word.reduce((sum, letter) => {
    return letter.isWild ? sum + 1 : sum
  }, 0)

  return numWilds * points
}

const isLetterNextToWild = (word: LetterInstance[], position: number): boolean => {
  const leftLetter = word.find((wordLetter) => wordLetter.position === position - 1)
  if (leftLetter?.isWild) {
    return true
  }

  const rightLetter = word.find((wordLetter) => wordLetter.position === position + 1)
  if (rightLetter?.isWild) {
    return true
  }

  return false
}


let nextAbilityId = 1;

export const getNextToVowelAbility = (points: number): IGameAbility => {
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

export const getNotNextToVowelAbility = (points: number): IGameAbility => {
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

export const getDoubleOtherLetterAbility = (position: number): IGameAbility => {
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

export const getInPositionAbility = (points: number, position: number): IGameAbility => {
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

export const getWordLengthAbility = (points: number, length: number): IGameAbility => {
  if (length < 4 || length > 7) {
    throw new Error("getWordLengthAbility length arg out of bounds " + length)
  }
  const images = [wordLength4, wordLength5, wordLength6, wordLength7]
  const text = points === 1 ? `scores 1 extra point if word is ${length} letters long` : `scores ${points} extra points if word is ${length} letters long`
  return {
    id: String(nextAbilityId++),
    image: images[length - 4],
    text,
    points,
    getIsActive: createIsWordLength(length),
    getPoints: () => points
  }
}

export const getMinWordLengthAbility = (points: number, length: number): IGameAbility => {
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

export const getMaxWordLengthAbility = (points: number, length: number): IGameAbility => {
  if (length < 4 || length > 7) {
    throw new Error("getMaxWordLengthAbility length arg out of bounds " + length)
  }
  const images = [maxWordLength4, maxWordLength5, maxWordLength6, maxWordLength7]
  const text = points === 1 ? `scores 1 extra point if word is no more than ${length} letters long` : `scores ${points} extra points if word is no more than ${length} letters long`
  return {
    id: String(nextAbilityId++),
    image: images[length - 4],
    text,
    points,
    getIsActive: createIsMaxWordLength(length),
    getPoints: () => points
  }
}

export const getInLastPosition = (points: number): IGameAbility => {
  const text = points === 1 ? "scores 1 extra point if letter is last position" : `scores ${points} extra points if letter last position`
  return {
    id: String(nextAbilityId++),
    image: inLastPosition,
    text,
    points,
    getIsActive: isLetterinLastPosition,
    getPoints: () => points
  }
}

export const getPointsPerVowelAbility = (points: number): IGameAbility => {
  return {
    id: String(nextAbilityId++),
    image: vowel,
    text: points === 1 ? "scores 1 point for every vowel" : `scores ${points} points for every vowel`,
    points,
    getIsActive: isWordHasVowels,
    getPoints: createGetPointsPerVowel(points)
  }
}

export const getPointsPerWildAbility = (points: number): IGameAbility => {
  return {
    id: String(nextAbilityId++),
    image: wilds,
    text: points === 1 ? "scores 1 point for every wild" : `scores ${points} points for every wild`,
    points,
    getIsActive: isWordHasWilds,
    getPoints: createGetPointsPerWild(points)
  }
}

export const getNextToWildAbility = (points: number): IGameAbility => {
  const text = points === 1 ? "scores 1 extra point if letter is next to a wild" : `scores ${points} extra points if letter is next to a wild`
  return {
    id: String(nextAbilityId++),
    image: nextToWild,
    text,
    points,
    getIsActive: isLetterNextToWild,
    getPoints: () => points
  }
}

export const getNotNextToWildAbility = (points: number): IGameAbility => {
  const text = points === 1 ? "scores 1 extra point if letter is not next to a wild" : `scores ${points} extra points if letter is not next to a wild`
  return {
    id: String(nextAbilityId++),
    image: notNextToWild,
    text,
    points,
    getIsActive: isLetterNotNextToWild,
    getPoints: () => points
  }
}

export const getWildAbility = (): IGameAbility => {
  const text = "Can be any letter";
  return {
    id: String(nextAbilityId++),
    image: wild,
    text,
    getIsActive: () => true,
    getPoints: () => 0
  }
}

export const getRetainAbility = (): IGameAbility => {
  return {
    id: String(nextAbilityId++),
    image: retain,
    text: "Retain this tile",
    getIsActive: () => true,
    getPoints: () => 0,
    getEndOfGameEffect: (word: LetterInstance[], letter: LetterInstance, player: Player) => {
      const existingLetter = player.inventory.find(otherLetter => otherLetter.id === letter.id)
      if (existingLetter) {
        existingLetter.limit = (existingLetter.limit || 0) + 1
      } else {
        const letterToRetain = new Letter({
          color: letter.color,
          char: letter.char,
          price: 0,
          points: letter.points,
          ability: letter.ability,
        }, 1)
  
        player.inventory = [...player.inventory, letterToRetain]
      }
      return player
    }
  }
}

export const getRetainLeftAbility = (): IGameAbility => {
  return {
    id: String(nextAbilityId++),
    image: retainLeft,
    text: "Retain the letter to the left",
    getIsActive: (word: LetterInstance[], position: number) => {
      if (position === 0) {
        return false
      }
      return word.some(otherLetter => otherLetter.position === position - 1)
    },
    getPoints: () => 0,
    getEndOfGameEffect: (word: LetterInstance[], letter: LetterInstance, player: Player) => {
      const leftLetter = word.find(otherLetter => otherLetter.position === (letter.position || 0) - 1)
      if (leftLetter) {
        const existingLetter = player.inventory.find(otherLetter => otherLetter.id === leftLetter.id)
        if (existingLetter) {
          existingLetter.limit = (existingLetter.limit || 0) + 1
        } else {
          const letterToRetain = new Letter({
            color: leftLetter.color,
            char: leftLetter.char,
            price: 0,
            points: leftLetter.points,
            ability: leftLetter.ability,
          }, 1)
          player.inventory = [...player.inventory, letterToRetain]
        }
      }

      return player
    }
  }
}

export const getRetainRightAbility = (): IGameAbility => {
  return {
    id: String(nextAbilityId++),
    image: retainRight,
    text: "Retain the letter to the right",
    getIsActive: (word: LetterInstance[], position: number) => {
      return word.some(otherLetter => otherLetter.position === position + 1)
    },
    getPoints: () => 0,
    getEndOfGameEffect: (word: LetterInstance[], letter: LetterInstance, player: Player) => {
      const rightLetter = word.find(otherLetter => otherLetter.position === (letter.position || 0) + 1)
      if (rightLetter) {
        const existingLetter = player.inventory.find(otherLetter => otherLetter.id === rightLetter.id)
        if (existingLetter) {
          existingLetter.limit = (existingLetter.limit || 0) + 1
        } else {
          const letterToRetain = new Letter({
            color: rightLetter.color,
            char: rightLetter.char,
            price: 0,
            points: rightLetter.points,
            ability: rightLetter.ability,
          }, 1)
          player.inventory = [...player.inventory, letterToRetain]
        }
      }

      return player
    }
  }
}

export const getClubAbility = (): IGameAbility => {
  return {
    id: String(nextAbilityId++),
    image: club,
    text: "Join the secret club to get access to rare letters",
    getIsActive: () => true,
    getPoints: () => 0,
    getEndOfGameEffect: (word: LetterInstance[], letter: LetterInstance, player: Player) => {
      player.isMember = true
      return player
    }
  }
}

export const getFundingAbility = (funding: number): IGameAbility => {
  const images = [funding1, funding2]
  return {
    id: String(nextAbilityId++),
    image: images[funding - 1],
    text: `Gain an extra ${funding} funding each day`,
    getIsActive: () => true,
    getPoints: () => 0,
    getEndOfGameEffect: (word: LetterInstance[], letter: LetterInstance, player: Player) => {
      player.funding = player.funding + funding
      return player
    }
  }
}