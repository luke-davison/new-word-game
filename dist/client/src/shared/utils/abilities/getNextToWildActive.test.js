"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums");
const getNextToWildActive_1 = require("./getNextToWildActive");
describe('getNextToWildActive', () => {
    it('returns false if word only has one letter', () => {
        const result = (0, getNextToWildActive_1.getIsNextToWildActive)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.NextToWild }
        ], 0);
        expect(result).toBe(false);
    });
    it('returns false if letter is first and not next to wild', () => {
        const result = (0, getNextToWildActive_1.getIsNextToWildActive)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.NextToWild },
            { id: '2', char: 'n', price: 1, points: 1, ability: enums_1.Abilities.Retain },
            { id: '3', char: 'd', price: 1, points: 1 }
        ], 0);
        expect(result).toBe(false);
    });
    it('returns true if letter is first and is next to wild', () => {
        const result = (0, getNextToWildActive_1.getIsNextToWildActive)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.NextToWild },
            { id: '2', char: 'n', price: 1, points: 1, ability: enums_1.Abilities.Wild },
            { id: '3', char: 'd', price: 1, points: 1 }
        ], 0);
        expect(result).toBe(true);
    });
    it('returns false if letter is last and not next to wild', () => {
        const result = (0, getNextToWildActive_1.getIsNextToWildActive)([
            { id: '1', char: 'a', price: 1, points: 1 },
            { id: '2', char: 'n', price: 1, points: 1, ability: enums_1.Abilities.Retain },
            { id: '3', char: 'd', price: 1, points: 1, ability: enums_1.Abilities.NextToWild }
        ], 2);
        expect(result).toBe(false);
    });
    it('returns true if letter is last and is next to wild', () => {
        const result = (0, getNextToWildActive_1.getIsNextToWildActive)([
            { id: '1', char: 'a', price: 1, points: 1 },
            { id: '2', char: 'n', price: 1, points: 1, ability: enums_1.Abilities.Wild },
            { id: '3', char: 'd', price: 1, points: 1, ability: enums_1.Abilities.NextToWild }
        ], 2);
        expect(result).toBe(true);
    });
    it('returns false if letter is in the middle and not next to wild', () => {
        const result = (0, getNextToWildActive_1.getIsNextToWildActive)([
            { id: '1', char: 'a', price: 1, points: 1 },
            { id: '2', char: 'n', price: 1, points: 1, ability: enums_1.Abilities.NextToWild },
            { id: '3', char: 'd', price: 1, points: 1, ability: enums_1.Abilities.Retain }
        ], 1);
        expect(result).toBe(false);
    });
    it('returns true if letter is in the middle and next to wild on left', () => {
        const result = (0, getNextToWildActive_1.getIsNextToWildActive)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.Wild },
            { id: '2', char: 'n', price: 1, points: 1, ability: enums_1.Abilities.NextToWild },
            { id: '3', char: 'd', price: 1, points: 1 }
        ], 1);
        expect(result).toBe(true);
    });
    it('returns true if letter is in the middle and next to wild on right', () => {
        const result = (0, getNextToWildActive_1.getIsNextToWildActive)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.Retain },
            { id: '2', char: 'n', price: 1, points: 1, ability: enums_1.Abilities.NextToWild },
            { id: '3', char: 'd', price: 1, points: 1, ability: enums_1.Abilities.Wild }
        ], 1);
        expect(result).toBe(true);
    });
    it('returns true if letter is in the middle and next to wild on both sides', () => {
        const result = (0, getNextToWildActive_1.getIsNextToWildActive)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.Wild },
            { id: '2', char: 'n', price: 1, points: 1, ability: enums_1.Abilities.NextToWild },
            { id: '3', char: 'd', price: 1, points: 1, ability: enums_1.Abilities.Wild }
        ], 1);
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=getNextToWildActive.test.js.map