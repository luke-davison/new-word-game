"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums");
const getAbilityPoints_1 = require("./getAbilityPoints");
describe('getAbilityPoints', () => {
    describe('Abilities.CopyAbilityInPosition1', () => {
        it('copies inPosition abilities correctly - is in position', () => {
            const result = (0, getAbilityPoints_1.getAbilityPoints)([
                { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.InPosition2, abilityPoints: 3 },
                { id: '2', char: 't', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition1 }
            ], 1);
            expect(result).toBe(3);
        });
        it('copies inPosition abilities correctly - is not in position', () => {
            const result = (0, getAbilityPoints_1.getAbilityPoints)([
                { id: '1', char: 'a', price: 1, points: 1, ability: enums_1.Abilities.InPosition3, abilityPoints: 3 },
                { id: '2', char: 't', price: 1, points: 1, ability: enums_1.Abilities.CopyAbilityInPosition1 }
            ], 1);
            expect(result).toBe(0);
        });
        it('copies otherInPosition abilities correctly - 1', () => {
            const result = (0, getAbilityPoints_1.getAbilityPoints)([
                { id: '1', char: 'a', price: 1, points: 4, ability: enums_1.Abilities.OtherInPosition2 },
                { id: '2', char: 't', price: 1, points: 3, ability: enums_1.Abilities.CopyAbilityInPosition1 }
            ], 1);
            expect(result).toBe(3);
        });
        it('copies otherInPosition abilities correctly - 2', () => {
            const result = (0, getAbilityPoints_1.getAbilityPoints)([
                { id: '1', char: 'a', price: 1, points: 4, ability: enums_1.Abilities.OtherInPosition1 },
                { id: '2', char: 't', price: 1, points: 3, ability: enums_1.Abilities.CopyAbilityInPosition1 }
            ], 1);
            expect(result).toBe(4);
        });
        it('copies nextToVowel abilities correctly - 1', () => {
            const result = (0, getAbilityPoints_1.getAbilityPoints)([
                { id: '1', char: 'a', price: 1, points: 4, ability: enums_1.Abilities.NextToVowel, abilityPoints: 2 },
                { id: '2', char: 't', price: 1, points: 3, ability: enums_1.Abilities.CopyAbilityInPosition1 }
            ], 1);
            expect(result).toBe(2);
        });
        it('copies nextToVowel abilities correctly - 2', () => {
            const result = (0, getAbilityPoints_1.getAbilityPoints)([
                { id: '1', char: 't', price: 1, points: 4, ability: enums_1.Abilities.NextToVowel, abilityPoints: 2 },
                { id: '2', char: 'a', price: 1, points: 3, ability: enums_1.Abilities.CopyAbilityInPosition1 }
            ], 1);
            expect(result).toBe(0);
        });
    });
});
//# sourceMappingURL=getAbilityPoints.test.js.map