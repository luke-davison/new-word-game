"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLetterInstancesToWord = exports.convertLettersToWord = void 0;
const convertLettersToWord = (letters) => {
    return letters.map(letter => ({ id: letter.id, char: letter.char }));
};
exports.convertLettersToWord = convertLettersToWord;
const convertLetterInstancesToWord = (letters) => {
    return letters.map(letter => ({ id: letter.parent.id, char: letter.char }));
};
exports.convertLetterInstancesToWord = convertLetterInstancesToWord;
//# sourceMappingURL=convertLettersToWord.js.map