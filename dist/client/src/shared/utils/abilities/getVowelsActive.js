"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVowelsActive = void 0;
const getIsChararacterVowel_1 = require("../getIsChararacterVowel");
const getVowelsActive = (word) => {
    return word.some(letter => letter && (0, getIsChararacterVowel_1.getIsCharacterVowel)(letter.char));
};
exports.getVowelsActive = getVowelsActive;
