import { Abilities } from '../../enums'
import { getIsNextToWildActive } from './getNextToWildActive'

describe('getNextToWildActive', () => {
  it('returns false if word only has one letter', () => {
    const result = getIsNextToWildActive([
      { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.NextToWild },
    ], 0)
    expect(result).toBe(false)
  })

  it('returns false if letter is first and not next to wild', () => {
    const result = getIsNextToWildActive([
      { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.NextToWild },
      { id: '2', char: 'n', price: 1, points: 1, ability: Abilities.Retain },
      { id: '3', char: 'd', price: 1, points: 1 },
    ], 0)
    expect(result).toBe(false)
  })

  it('returns true if letter is first and is next to wild', () => {
    const result = getIsNextToWildActive([
      { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.NextToWild },
      { id: '2', char: 'n', price: 1, points: 1, ability: Abilities.Wild },
      { id: '3', char: 'd', price: 1, points: 1 },
    ], 0)
    expect(result).toBe(true)
  })

  it('returns false if letter is last and not next to wild', () => {
    const result = getIsNextToWildActive([
      { id: '1', char: 'a', price: 1, points: 1 },
      { id: '2', char: 'n', price: 1, points: 1, ability: Abilities.Retain },
      { id: '3', char: 'd', price: 1, points: 1, ability: Abilities.NextToWild },
    ], 2)
    expect(result).toBe(false)
  })

  it('returns true if letter is last and is next to wild', () => {
    const result = getIsNextToWildActive([
      { id: '1', char: 'a', price: 1, points: 1 },
      { id: '2', char: 'n', price: 1, points: 1, ability: Abilities.Wild },
      { id: '3', char: 'd', price: 1, points: 1, ability: Abilities.NextToWild },
    ], 2)
    expect(result).toBe(true)
  })

  it('returns false if letter is in the middle and not next to wild', () => {
    const result = getIsNextToWildActive([
      { id: '1', char: 'a', price: 1, points: 1 },
      { id: '2', char: 'n', price: 1, points: 1, ability: Abilities.NextToWild },
      { id: '3', char: 'd', price: 1, points: 1, ability: Abilities.Retain },
    ], 1)
    expect(result).toBe(false)
  })

  it('returns true if letter is in the middle and next to wild on left', () => {
    const result = getIsNextToWildActive([
      { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.Wild },
      { id: '2', char: 'n', price: 1, points: 1, ability: Abilities.NextToWild },
      { id: '3', char: 'd', price: 1, points: 1 },
    ], 1)
    expect(result).toBe(true)
  })

  it('returns true if letter is in the middle and next to wild on right', () => {
    const result = getIsNextToWildActive([
      { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.Retain },
      { id: '2', char: 'n', price: 1, points: 1, ability: Abilities.NextToWild },
      { id: '3', char: 'd', price: 1, points: 1, ability: Abilities.Wild },
    ], 1)
    expect(result).toBe(true)
  })

  it('returns true if letter is in the middle and next to wild on both sides', () => {
    const result = getIsNextToWildActive([
      { id: '1', char: 'a', price: 1, points: 1, ability: Abilities.Wild },
      { id: '2', char: 'n', price: 1, points: 1, ability: Abilities.NextToWild },
      { id: '3', char: 'd', price: 1, points: 1, ability: Abilities.Wild },
    ], 1)
    expect(result).toBe(true)
  })
})