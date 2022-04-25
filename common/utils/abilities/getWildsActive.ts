import { ILetter } from "../../datamodels"
import { Abilities } from "../../enums"

export const getWildsActive = (word: ILetter[]): boolean => {
  return word.some(letter => letter?.ability === Abilities.Wild)
}