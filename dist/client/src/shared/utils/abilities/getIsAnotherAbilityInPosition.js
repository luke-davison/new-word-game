"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsAnotherAbilityInPosition = void 0;
const enums_1 = require("../../enums");
const abilitiesThatCannotBeCopied = [
    enums_1.Abilities.Club,
    enums_1.Abilities.CopyAbilityInPosition1,
    enums_1.Abilities.CopyAbilityInPosition2,
    enums_1.Abilities.CopyAbilityInPosition3,
    enums_1.Abilities.CopyAbilityInPosition4,
    enums_1.Abilities.CopyAbilityInPosition5,
    enums_1.Abilities.Wild
];
const getIsAnotherAbilityInPosition = (word, otherPosition) => {
    if (word.length <= otherPosition) {
        return false;
    }
    const letterInPosition = word[otherPosition];
    if (!letterInPosition || !letterInPosition.ability) {
        return false;
    }
    if (abilitiesThatCannotBeCopied.some(ability => letterInPosition.ability === ability)) {
        return false;
    }
    return true;
};
exports.getIsAnotherAbilityInPosition = getIsAnotherAbilityInPosition;
