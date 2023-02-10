import { generateNickname } from './generateNickname'

describe('generateNickname', () => {
  it('returns a string', () => {
    const result = generateNickname()
    expect(typeof result).toBe('string')
  })

  it('contains a space', () => {
    const result = generateNickname()
    expect(result.indexOf(' ')).not.toBe(-1)
  })
})