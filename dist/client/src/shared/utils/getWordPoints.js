"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWordPoints = void 0;
const getAbilityPoints_1 = require("./abilities/getAbilityPoints");
const getWordPoints = (word) => {
    return word.reduce((sum, letter, position) => {
        return sum + letter.points + (0, getAbilityPoints_1.getAbilityPoints)(word, position);
    }, 0);
};
exports.getWordPoints = getWordPoints;
