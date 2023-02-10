"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../client/src/shared/enums");
const getFundingFromLetters_1 = require("./getFundingFromLetters");
describe('getFundingFromLetters', () => {
    it('returns 0 if no letters', () => {
        const testData = [];
        const result = (0, getFundingFromLetters_1.getFundingFromLetters)(testData);
        expect(result).toBe(0);
    });
    it('returns 0 if no letters with abilities', () => {
        const testData = [{ id: '1', char: 'a', points: 1, price: 1 }];
        const result = (0, getFundingFromLetters_1.getFundingFromLetters)(testData);
        expect(result).toBe(0);
    });
    it('returns 0 if letters with other abilities', () => {
        const testData = [
            { id: '1', char: 'a', points: 1, price: 1, ability: enums_1.Abilities.InPosition1 },
            { id: '1', char: 'b', points: 1, price: 1, ability: enums_1.Abilities.InPosition2 }
        ];
        const result = (0, getFundingFromLetters_1.getFundingFromLetters)(testData);
        expect(result).toBe(0);
    });
    it('returns correct total if mix of funding abilities', () => {
        const testData = [
            { id: '1', char: 'a', points: 1, price: 1, ability: enums_1.Abilities.Funding1 },
            { id: '1', char: 'b', points: 1, price: 1, ability: enums_1.Abilities.Funding2 },
            { id: '1', char: 'c', points: 1, price: 1, ability: enums_1.Abilities.InPosition2 },
            { id: '1', char: 'd', points: 1, price: 1, ability: enums_1.Abilities.Funding2 },
            { id: '1', char: 'e', points: 1, price: 1, ability: enums_1.Abilities.Funding2 }
        ];
        const result = (0, getFundingFromLetters_1.getFundingFromLetters)(testData);
        expect(result).toBe(7);
    });
});
//# sourceMappingURL=getFundingFromLetters.test.js.map