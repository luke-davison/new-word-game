"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsWordInWordlist = void 0;
const getWordlist_1 = require("./getWordlist");
const getIsWordInWordlist = (word) => {
    return getWordlist_1.wordlist.indexOf(word) !== -1;
};
exports.getIsWordInWordlist = getIsWordInWordlist;
//# sourceMappingURL=getIsWordInWordlist.js.map