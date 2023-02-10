import { Abilities } from '../../enums'
import { getWildsActive } from './getWildsActive'

describe('getWildsActive', () => {
  it('returns false if word is empty', () => {
    const result = getWildsActive([])
    expect(result).toBe(false)
  })

  it('returns false if word contains no wilds', () => {
    const result = getWildsActive([
      { id: '1', char: 'h', price: 1, points: 1 },
      { id: '1', char: 'i', price: 1, points: 1, ability: Abilities.Retain }
    ])
    expect(result).toBe(false)
  })

  it('returns true if word contains wilds', () => {
    const result = getWildsActive([
      { id: '1', char: 'h', price: 1, points: 1 },
      { id: '1', char: 'i', price: 1, points: 1, ability: Abilities.Wild }
    ])
    expect(result).toBe(true)
  })
})