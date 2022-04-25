import { Abilities } from "../../enums"
import { getVowelsActive } from "./getVowelsActive"

describe("getVowelsActive", () => {
  it("returns false if word is empty", () => {
    const result = getVowelsActive([])
    expect(result).toBe(false)
  })

  it("returns false if word contains no vowels", () => {
    const result = getVowelsActive([
      { id: "1", char: "b", price: 1, points: 1 },
      { id: "1", char: "y", price: 1, points: 1, ability: Abilities.Retain }
    ])
    expect(result).toBe(false)
  })

  it("returns true if word contains vowels", () => {
    const result = getVowelsActive([
      { id: "1", char: "b", price: 1, points: 1 },
      { id: "1", char: "e", price: 1, points: 1, ability: Abilities.Retain }
    ])
    expect(result).toBe(true)
  })
})