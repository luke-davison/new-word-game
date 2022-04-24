import { getNextEndOfCampaignDateString } from "./getNextEndOfCampaignDateString"

describe("getNextEndOfCampaignDateString", () => {
  it("returns correct date if date given is sunday", () => {
    const result = getNextEndOfCampaignDateString(new Date(2022, 3, 17))
    expect(result).toBe("2022-04-23")
  })

  it("returns correct date if date given is monday", () => {
    const result = getNextEndOfCampaignDateString(new Date(2022, 3, 18))
    expect(result).toBe("2022-04-23")
  })

  it("returns correct date if date given is tuesday", () => {
    const result = getNextEndOfCampaignDateString(new Date(2022, 3, 19))
    expect(result).toBe("2022-04-23")
  })

  it("returns correct date if date given is wednesday", () => {
    const result = getNextEndOfCampaignDateString(new Date(2022, 3, 20))
    expect(result).toBe("2022-04-23")
  })

  it("returns correct date if date given is thursday", () => {
    const result = getNextEndOfCampaignDateString(new Date(2022, 3, 21))
    expect(result).toBe("2022-04-23")
  })

  it("returns correct date if date given is friday", () => {
    const result = getNextEndOfCampaignDateString(new Date(2022, 3, 22))
    expect(result).toBe("2022-04-23")
  })

  it("returns correct date if date given is saturday", () => {
    const result = getNextEndOfCampaignDateString(new Date(2022, 3, 23))
    expect(result).toBe("2022-04-23")
  })
})