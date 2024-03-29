import { Abilities, ILetter } from '../../client/src/shared'

export const getWildLetter = (): Omit<ILetter, 'id'> => {
  return {
    price: 1,
    points: 0,
    char: '',
    ability: Abilities.Wild
  }
}