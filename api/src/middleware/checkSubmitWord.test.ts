import { ISubmitWord } from '../../../shared/datamodels';
import { getDateString } from '../../../shared/utils';
import { getTodayDateString } from '../utils/getTodayDateString';
import { getCheckSubmitWordError } from './checkSubmitWord';

const testInput: ISubmitWord = {
  date: getTodayDateString(),
  userId: '0',
  word: [{ id: '1', char: 'p' }, { id: '2', char: 'i' }, { id: '3', char: 'g' }]
}

describe("getCheckSubmitWordError", () => {
  it('returns no error if data is correct', () => {
    const result = getCheckSubmitWordError(testInput)
    expect(result).toBe(undefined)
  })
  
  it("returns error message if no words array", () => {
    const result = getCheckSubmitWordError({ ...testInput, word: undefined } as unknown as ISubmitWord)
    expect(result).toBe("Unable to validate - invalid word")
  })

  it("returns error message if words array contains invalid objects", () => {
    const word = [2]
    const result = getCheckSubmitWordError({ ...testInput, word } as unknown as ISubmitWord)
    expect(result).toBe("Unable to validate - invalid letter")
  })

  it("returns error message if letter is missing character", () => {
    const word = [{ id: "1" }, { id: "2", char: "i" }]
    const result = getCheckSubmitWordError({ ...testInput, word } as unknown as ISubmitWord)
    expect(result).toBe("Unable to validate - invalid letter")
  })

  it("returns error message if letter is missing ID", () => {
    const word = [{ id: "1", char: "hi" }, { char: "i" }]
    const result = getCheckSubmitWordError({ ...testInput, word } as unknown as ISubmitWord)
    expect(result).toBe("Unable to validate - invalid letter")
  })

  it("returns error message if no userID", () => {
    const result = getCheckSubmitWordError({ ...testInput, userId: undefined } as unknown as ISubmitWord)
    expect(result).toBe("Unable to validate - no user")
  })

  it("returns error message if no date", () => {
    const result = getCheckSubmitWordError({ ...testInput, date: undefined } as unknown as ISubmitWord)
    expect(result).toBe("Unable to validate - no date")
  })

  it("returns error message if date is not a valid date", () => {
    const result = getCheckSubmitWordError({ ...testInput, date: "asdf" })
    expect(result).toBe("Unable to validate - date does not match")
  })

  it("returns error message if date is different", () => {
    const result = getCheckSubmitWordError({ ...testInput, date: "2022-04-23" })
    expect(result).toBe("Unable to validate - date does not match")
  })
})