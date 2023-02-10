"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateNickname_1 = require("./generateNickname");
describe('generateNickname', () => {
    it('returns a string', () => {
        const result = (0, generateNickname_1.generateNickname)();
        expect(typeof result).toBe('string');
    });
    it('contains a space', () => {
        const result = (0, generateNickname_1.generateNickname)();
        expect(result.indexOf(' ')).not.toBe(-1);
    });
});
//# sourceMappingURL=generateNickname.test.js.map