"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFundingFromLetters = void 0;
const Abilities_1 = require("../../client/src/shared/enums/Abilities");
const getFundingFromLetters = (letters) => {
    let funding = 0;
    letters.forEach(letter => {
        if (letter.ability === Abilities_1.Abilities.Funding1) {
            funding += 1;
        }
        if (letter.ability === Abilities_1.Abilities.Funding2) {
            funding += 2;
        }
    });
    return funding;
};
exports.getFundingFromLetters = getFundingFromLetters;
//# sourceMappingURL=getFundingFromLetters.js.map