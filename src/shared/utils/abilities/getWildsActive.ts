import { ILetter } from "../../datamodels"
import { Abilities } from "../../enums"

export const getWildsActive = (word: Array<ILetter | undefined>): boolean => {
  return word.some(letter => letter?.ability === Abilities.Wild)
}