"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventoryAfterSubmit = void 0;
const enums_1 = require("../../client/src/shared/enums");
const getInventoryAfterSubmit = (letters, inventory = []) => {
    const unusedInventory = inventory.filter(inventoryLetter => !letters.some(letter => letter.id === inventoryLetter.id));
    const retainedLetters = letters.filter((letter, position) => {
        if (letter.ability === enums_1.Abilities.Retain) {
            return true;
        }
        if (position > 0 && letters[position - 1].ability === enums_1.Abilities.RetainRight) {
            return true;
        }
        if (position < letters.length - 1 && letters[position + 1].ability === enums_1.Abilities.RetainLeft) {
            return true;
        }
        return false;
    });
    return [...unusedInventory, ...retainedLetters];
};
exports.getInventoryAfterSubmit = getInventoryAfterSubmit;
//# sourceMappingURL=getInventoryAfterSubmit.js.map