"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums");
const getIsAnotherAbilityInPosition_1 = require("./getIsAnotherAbilityInPosition");
describe('getIsAnotherAbilityInPosition', () => {
    it('returns false if other letter is the same letter', () => {
        const result = (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition1 }
        ], 0);
        expect(result).toBe(false);
    });
    it('returns false if other letter has no ability', () => {
        const result = (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)([
            { id: '1', char: 'a', price: 1, points: 1 },
            { id: '2', char: 't', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition1 }
        ], 0);
        expect(result).toBe(false);
    });
    it('returns false if other letter has a copy ability', () => {
        const result = (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition2 },
            { id: '2', char: 't', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition1 }
        ], 0);
        expect(result).toBe(false);
    });
    it('returns false if other letter has a club ability', () => {
        const result = (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition2 },
            { id: '2', char: 't', price: 1, points: 1, ability: enums_1.Abilities.Club }
        ], 1);
        expect(result).toBe(false);
    });
    it('returns true if other letter has a wild ability', () => {
        const result = (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition2 },
            { id: '2', char: 't', price: 1, points: 1, ability: enums_1.Abilities.Wild }
        ], 1);
        expect(result).toBe(false);
    });
    it('returns true if other letter has a valid ability (position 1)', () => {
        const result = (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)([
            { id: '2', char: 't', price: 1, points: 1, ability: enums_1.Abilities.NextToWild },
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition2 }
        ], 0);
        expect(result).toBe(true);
    });
    it('returns true if other letter has a valid ability (position 2)', () => {
        const result = (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition2 },
            { id: '2', char: 't', price: 1, points: 1, ability: enums_1.Abilities.NextToWild }
        ], 1);
        expect(result).toBe(true);
    });
    it('returns true if other letter has a valid ability (position 3)', () => {
        const result = (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition3 },
            { id: '2', char: 'n', price: 1, points: 1, ability: enums_1.Abilities.NextToWild },
            { id: '3', char: 't', price: 1, points: 1, ability: enums_1.Abilities.Wilds }
        ], 2);
        expect(result).toBe(true);
    });
    it('returns true if other letter has a valid ability (position 4)', () => {
        const result = (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)([
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition4 },
            { id: '2', char: 'n', price: 1, points: 1, ability: enums_1.Abilities.NextToWild },
            { id: '3', char: 't', price: 1, points: 1, ability: enums_1.Abilities.Wilds },
            { id: '4', char: 's', price: 1, points: 1, ability: enums_1.Abilities.InPosition1 }
        ], 3);
        expect(result).toBe(true);
    });
    it('returns true if other letter has a valid ability (position 5)', () => {
        const result = (0, getIsAnotherAbilityInPosition_1.getIsAnotherAbilityInPosition)([
            { id: '4', char: 's', price: 1, points: 1, ability: enums_1.Abilities.NextToWild },
            { id: '5', char: 'c', price: 1, points: 1, ability: enums_1.Abilities.Wilds },
            { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition5 },
            { id: '2', char: 'n', price: 1, points: 1, ability: enums_1.Abilities.Club },
            { id: '3', char: 't', price: 1, points: 1, ability: enums_1.Abilities.OtherInPosition1 }
        ], 4);
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=getIsAnotherAbilityInPosition.test.js.map