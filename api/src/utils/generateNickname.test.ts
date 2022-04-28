import { generateNickname } from './generateNickname';

describe("generateNickname", () => {
  it("returns a string", () => {
    const result = generateNickname();
    console.log(result)
    expect(typeof result).toBe("string")
  })

  it("contains a space", () => {
    const result = generateNickname();
    console.log(result)
    expect(result.indexOf(" ")).not.toBe(-1)
  })
})