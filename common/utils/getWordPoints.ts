import { ILetter } from "../datamodels";
import { getAbilityPoints } from "./abilities/getAbilityPoints";

export const getWordPoints = (word: ILetter[]): number => {
  return word.reduce((sum, letter, position) => {
    return sum + letter.points + getAbilityPoints(word, position)
  }, 0)
}