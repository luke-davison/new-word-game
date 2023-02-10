"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums");
const getVowelsActive_1 = require("./getVowelsActive");
describe('getVowelsActive', () => {
    it('returns false if word is empty', () => {
        const result = (0, getVowelsActive_1.getVowelsActive)([]);
        expect(result).toBe(false);
    });
    it('returns false if word contains no vowels', () => {
        const result = (0, getVowelsActive_1.getVowelsActive)([
            { id: '1', char: 'b', price: 1, points: 1 },
            { id: '1', char: 'y', price: 1, points: 1, ability: enums_1.Abilities.Retain }
        ]);
        expect(result).toBe(false);
    });
    it('returns true if word contains vowels', () => {
        const result = (0, getVowelsActive_1.getVowelsActive)([
            { id: '1', char: 'b', price: 1, points: 1 },
            { id: '1', char: 'e', price: 1, points: 1, ability: enums_1.Abilities.Retain }
        ]);
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=getVowelsActive.test.js.map