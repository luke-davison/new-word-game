
import { ILetter } from '../datamodels';
import { Letter } from '../models';

export const setupLetters = (letters: ILetter[] = []): Letter[] => {
  return letters.map((letter, index) => {
    return new Letter({
      char: letter.char,
      color: index + 1,
      price: letter.price,
      points: letter.points,
      ability: letter.ability,
      abilityPoints: letter.abilityPoints
    })
  })
}