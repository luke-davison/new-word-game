import { ILetter } from "../../datamodels"
import { getIsCharacterVowel } from "../getIsChararacterVowel"

export const getVowelsActive = (word: ILetter[]): boolean => {
  return word.some(letter => getIsCharacterVowel(letter.char))
}