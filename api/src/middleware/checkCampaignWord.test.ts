import { ISubmitCampaignWord } from "../../../common/datamodels"
import { getDateString } from "../../../common/utils";
import { getCheckCampaignWordError } from "./checkCampaignWord"

const testInput: ISubmitCampaignWord = {
  date: getDateString(new Date()),
  userId: '0',
  word: [{ id: '1', char: 'p' }, { id: '2', char: 'i' }, { id: '3', char: 'g' }]
}

describe("getCheckCampaignWordError", () => {
  it('returns no error if data is correct', () => {
    const result = getCheckCampaignWordError(testInput)
    expect(result).toBe(undefined)
  })
  
  it("returns error message if no words array", () => {
    const result = getCheckCampaignWordError({ ...testInput, word: undefined } as unknown as ISubmitCampaignWord)
    expect(result).toBe("Unable to validate - invalid word")
  })

  it("returns error message if words array contains invalid objects", () => {
    const word = [2]
    const result = getCheckCampaignWordError({ ...testInput, word } as unknown as ISubmitCampaignWord)
    expect(result).toBe("Unable to validate - invalid letter")
  })

  it("returns error message if letter is missing character", () => {
    const word = [{ id: "1" }, { id: "2", char: "i" }]
    const result = getCheckCampaignWordError({ ...testInput, word } as unknown as ISubmitCampaignWord)
    expect(result).toBe("Unable to validate - invalid letter")
  })

  it("returns error message if letter is missing ID", () => {
    const word = [{ id: "1", char: "hi" }, { char: "i" }]
    const result = getCheckCampaignWordError({ ...testInput, word } as unknown as ISubmitCampaignWord)
    expect(result).toBe("Unable to validate - invalid letter")
  })

  it("returns error message if no userID", () => {
    const result = getCheckCampaignWordError({ ...testInput, userId: undefined } as unknown as ISubmitCampaignWord)
    expect(result).toBe("Unable to validate - no user")
  })

  it("returns error message if no date", () => {
    const result = getCheckCampaignWordError({ ...testInput, date: undefined } as unknown as ISubmitCampaignWord)
    expect(result).toBe("Unable to validate - no date")
  })

  it("returns error message if date is not a valid date", () => {
    const result = getCheckCampaignWordError({ ...testInput, date: "asdf" })
    expect(result).toBe("Unable to validate - date does not match")
  })

  it("returns error message if date is different", () => {
    const result = getCheckCampaignWordError({ ...testInput, date: "2022-04-23" })
    expect(result).toBe("Unable to validate - date does not match")
  })
})