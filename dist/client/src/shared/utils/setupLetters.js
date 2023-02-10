"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLetters = void 0;
const models_1 = require("../models");
const setupLetters = (letters = []) => {
    return letters.map((letter, index) => {
        return new models_1.Letter(Object.assign(Object.assign({}, letter), { color: index + 1 }));
    });
};
exports.setupLetters = setupLetters;
//# sourceMappingURL=setupLetters.js.map