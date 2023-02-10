"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbilityPoints = void 0;
const enums_1 = require("../../enums");
const getIsChararacterVowel_1 = require("../getIsChararacterVowel");
const getAbilityIsActive_1 = require("./getAbilityIsActive");
const copyAbilities = [
    enums_1.Abilities.CopyAbilityInPosition1,
    enums_1.Abilities.CopyAbilityInPosition2,
    enums_1.Abilities.CopyAbilityInPosition3,
    enums_1.Abilities.CopyAbilityInPosition4,
    enums_1.Abilities.CopyAbilityInPosition5
];
const getAbilityPoints = (word, position, player) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const letter = word[position];
    if (!letter) {
        return 0;
    }
    const isActive = (0, getAbilityIsActive_1.getAbilityIsActive)(word, position, player);
    if (!isActive)
        return 0;
    switch (letter.ability) {
        case enums_1.Abilities.OtherInPosition1: return ((_a = word[0]) === null || _a === void 0 ? void 0 : _a.points) || 0;
        case enums_1.Abilities.OtherInPosition2: return ((_b = word[1]) === null || _b === void 0 ? void 0 : _b.points) || 0;
        case enums_1.Abilities.OtherInPosition3: return ((_c = word[2]) === null || _c === void 0 ? void 0 : _c.points) || 0;
        case enums_1.Abilities.OtherInPosition4: return ((_d = word[3]) === null || _d === void 0 ? void 0 : _d.points) || 0;
        case enums_1.Abilities.OtherInPosition5: return ((_e = word[4]) === null || _e === void 0 ? void 0 : _e.points) || 0;
    }
    switch (letter.ability) {
        case enums_1.Abilities.Vowels:
            return word.reduce((sum, otherLetter) => otherLetter && (0, getIsChararacterVowel_1.getIsCharacterVowel)(otherLetter.char) ? sum + (letter.abilityPoints || 0) : sum, 0);
        case enums_1.Abilities.Wilds:
            return word.reduce((sum, otherLetter) => (otherLetter === null || otherLetter === void 0 ? void 0 : otherLetter.ability) === enums_1.Abilities.Wild ? sum + (letter.abilityPoints || 0) : sum, 0);
    }
    if (copyAbilities.some(ability => ability === letter.ability)) {
        let modifiedWord = Array.from(word);
        let positionToCopy = 0;
        switch (letter.ability) {
            case enums_1.Abilities.CopyAbilityInPosition1:
                positionToCopy = 0;
                break;
            case enums_1.Abilities.CopyAbilityInPosition2:
                positionToCopy = 1;
                break;
            case enums_1.Abilities.CopyAbilityInPosition3:
                positionToCopy = 2;
                break;
            case enums_1.Abilities.CopyAbilityInPosition4:
                positionToCopy = 3;
                break;
            case enums_1.Abilities.CopyAbilityInPosition5:
                positionToCopy = 4;
                break;
        }
        const letterToUpdate = word[position];
        const updatedLetter = letterToUpdate ? Object.assign(Object.assign({}, letterToUpdate), { ability: (_f = word[positionToCopy]) === null || _f === void 0 ? void 0 : _f.ability, abilityPoints: (_g = word[positionToCopy]) === null || _g === void 0 ? void 0 : _g.abilityPoints }) : undefined;
        modifiedWord[position] = updatedLetter;
        return (0, exports.getAbilityPoints)(modifiedWord, position, player);
    }
    return letter.abilityPoints || 0;
};
exports.getAbilityPoints = getAbilityPoints;
//# sourceMappingURL=getAbilityPoints.js.map