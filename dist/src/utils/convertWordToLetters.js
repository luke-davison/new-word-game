"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertWordToLetters = void 0;
const convertWordToLetters = (word, game, player) => {
    const inventory = (player === null || player === void 0 ? void 0 : player.inventory) || [];
    const memberLetters = (player === null || player === void 0 ? void 0 : player.isMember) && 'memberLetters' in game ? game.memberLetters : [];
    const availableLetters = [...game.letters, ...inventory, ...memberLetters];
    const letters = word.map(({ id }) => availableLetters.find(letter => letter.id === id));
    return letters.filter(x => x);
};
exports.convertWordToLetters = convertWordToLetters;
//# sourceMappingURL=convertWordToLetters.js.map