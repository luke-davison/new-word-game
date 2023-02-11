
import { Letter } from '../../models/Letter'
import { ILetter } from '../datamodels'

export const setupLetters = (letters: ILetter[] = []): Letter[] => {
  return letters.map((letter, index) => {
    return new Letter({
      ...letter,
      color: index + 1
    })
  })
}