"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsNextToWildActive = void 0;
const enums_1 = require("../../enums");
const getIsNextToWildActive = (word, position) => {
    if (position > 0) {
        const letterBefore = word[position - 1];
        if (letterBefore && letterBefore.ability === enums_1.Abilities.Wild) {
            return true;
        }
    }
    if (position < word.length - 1) {
        const letterAfter = word[position + 1];
        if (letterAfter && letterAfter.ability === enums_1.Abilities.Wild) {
            return true;
        }
    }
    return false;
};
exports.getIsNextToWildActive = getIsNextToWildActive;
