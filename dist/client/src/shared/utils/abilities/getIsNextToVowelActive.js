"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsNextToVowelActive = void 0;
const getIsChararacterVowel_1 = require("../getIsChararacterVowel");
const getIsNextToVowelActive = (word, position) => {
    if (position > 0) {
        const letterBefore = word[position - 1];
        if (letterBefore && (0, getIsChararacterVowel_1.getIsCharacterVowel)(letterBefore.char)) {
            return true;
        }
    }
    if (position < word.length - 1) {
        const letterAfter = word[position + 1];
        if (letterAfter && (0, getIsChararacterVowel_1.getIsCharacterVowel)(letterAfter.char)) {
            return true;
        }
    }
    return false;
};
exports.getIsNextToVowelActive = getIsNextToVowelActive;
