import { ILetter } from "../../client/src/shared"
import { Letter } from "../models/Letter"

export const setupLetters = (letters: ILetter[] = []): Letter[] => {
  return letters.map((letter, index) => {
    return new Letter({
      ...letter,
      color: index + 1
    })
  })
}