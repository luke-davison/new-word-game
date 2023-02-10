"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWildsActive = void 0;
const enums_1 = require("../../enums");
const getWildsActive = (word) => {
    return word.some(letter => (letter === null || letter === void 0 ? void 0 : letter.ability) === enums_1.Abilities.Wild);
};
exports.getWildsActive = getWildsActive;
//# sourceMappingURL=getWildsActive.js.map