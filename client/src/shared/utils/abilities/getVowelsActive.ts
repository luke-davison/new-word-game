import { ILetter } from '../../datamodels'
import { getIsCharacterVowel } from '../getIsChararacterVowel'

export const getVowelsActive = (word: Array<ILetter | undefined>): boolean => {
  return word.some(letter => letter && getIsCharacterVowel(letter.char))
}