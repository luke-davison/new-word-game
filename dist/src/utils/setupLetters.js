"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLetters = void 0;
const Letter_1 = require("../models/Letter");
const setupLetters = (letters = []) => {
    return letters.map((letter, index) => {
        return new Letter_1.Letter(Object.assign(Object.assign({}, letter), { color: index + 1 }));
    });
};
exports.setupLetters = setupLetters;
