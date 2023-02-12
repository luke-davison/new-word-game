"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNickname = void 0;
const utils_1 = require("../../client/src/shared/utils");
const titles = [
    'Mr',
    'Mrs',
    'Miss',
    'Ms',
    'Dr',
    'Sir',
    'Lady',
    'Lord',
    'Captain'
];
const generateNickname = () => {
    const titleIndex = Math.floor(Math.random() * titles.length);
    const wordIndex = Math.floor(Math.random() * utils_1.wordlist.length);
    const word = utils_1.wordlist[wordIndex];
    return titles[titleIndex] + ' ' + word.slice(0, 1)[0].toUpperCase() + word.slice(1);
};
exports.generateNickname = generateNickname;
