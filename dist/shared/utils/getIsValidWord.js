"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsValidWord = void 0;
const getIsWordInWordlist_1 = require("./getIsWordInWordlist");
const getIsValidWord = (word) => {
    const highestPosition = word.reduce((high, letter) => {
        const { position = 0 } = letter;
        return position > high ? position : high;
    }, 0);
    if (highestPosition > word.length - 1) {
        return false;
    }
    if (word.some(letter => letter.isWild && !letter.char)) {
        return false;
    }
    const str = word.reduce((str, letter) => str + letter.char, '');
    return (0, getIsWordInWordlist_1.getIsWordInWordlist)(str);
};
exports.getIsValidWord = getIsValidWord;
//# sourceMappingURL=getIsValidWord.js.map