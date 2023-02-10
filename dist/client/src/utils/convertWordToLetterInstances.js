"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertWordToLetterInstances = void 0;
const LetterInstance_1 = require("../models/LetterInstance");
const convertWordToLetterInstances = (word, letters) => {
    const letterInstances = word.map(({ id, char }, index) => {
        const parent = letters.find(letter => letter.id === id);
        if (!parent) {
            return undefined;
        }
        const letterInstance = new LetterInstance_1.LetterInstance(parent, index);
        if (letterInstance.isWild) {
            letterInstance.setWildLetter(char);
        }
        return letterInstance;
    });
    return letterInstances.filter(x => x);
};
exports.convertWordToLetterInstances = convertWordToLetterInstances;
//# sourceMappingURL=convertWordToLetterInstances.js.map