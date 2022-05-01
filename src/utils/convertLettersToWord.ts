import { LetterInstance } from '../models/LetterInstance';
import { ISubmitWord, Letter } from '../shared';
import { IRawLetter } from '../shared/datamodels/IRawLetter';

export const convertLettersToWord = (letters: Letter[]): IRawLetter[] => {
  return letters.map(letter => ({ id: letter.id, char: letter.char }))
}

export const convertLetterInstancesToWord = (letters: LetterInstance[]): IRawLetter[] => {
  return letters.map(letter => ({ id: letter.parent.id, char: letter.char }))
}