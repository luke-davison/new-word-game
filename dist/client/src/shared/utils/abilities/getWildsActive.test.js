"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums");
const getWildsActive_1 = require("./getWildsActive");
describe('getWildsActive', () => {
    it('returns false if word is empty', () => {
        const result = (0, getWildsActive_1.getWildsActive)([]);
        expect(result).toBe(false);
    });
    it('returns false if word contains no wilds', () => {
        const result = (0, getWildsActive_1.getWildsActive)([
            { id: '1', char: 'h', price: 1, points: 1 },
            { id: '1', char: 'i', price: 1, points: 1, ability: enums_1.Abilities.Retain }
        ]);
        expect(result).toBe(false);
    });
    it('returns true if word contains wilds', () => {
        const result = (0, getWildsActive_1.getWildsActive)([
            { id: '1', char: 'h', price: 1, points: 1 },
            { id: '1', char: 'i', price: 1, points: 1, ability: enums_1.Abilities.Wild }
        ]);
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=getWildsActive.test.js.map