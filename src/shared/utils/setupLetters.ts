
import { ILetter } from '../datamodels';
import { Letter } from '../models';

export const setupLetters = (letters: ILetter[] = []): Letter[] => {
  return letters.map((letter, index) => {
    return new Letter({
      ...letter,
      color: index + 1
    })
  })
}