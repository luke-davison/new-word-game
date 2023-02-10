"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getNextEndOfCampaignDateString_1 = require("./getNextEndOfCampaignDateString");
describe('getNextEndOfCampaignDateString', () => {
    it('returns correct date if date given is sunday', () => {
        const result = (0, getNextEndOfCampaignDateString_1.getNextEndOfCampaignDateString)(new Date(2022, 3, 17));
        expect(result).toBe('2022-04-23');
    });
    it('returns correct date if date given is monday', () => {
        const result = (0, getNextEndOfCampaignDateString_1.getNextEndOfCampaignDateString)(new Date(2022, 3, 18));
        expect(result).toBe('2022-04-23');
    });
    it('returns correct date if date given is tuesday', () => {
        const result = (0, getNextEndOfCampaignDateString_1.getNextEndOfCampaignDateString)(new Date(2022, 3, 19));
        expect(result).toBe('2022-04-23');
    });
    it('returns correct date if date given is wednesday', () => {
        const result = (0, getNextEndOfCampaignDateString_1.getNextEndOfCampaignDateString)(new Date(2022, 3, 20));
        expect(result).toBe('2022-04-23');
    });
    it('returns correct date if date given is thursday', () => {
        const result = (0, getNextEndOfCampaignDateString_1.getNextEndOfCampaignDateString)(new Date(2022, 3, 21));
        expect(result).toBe('2022-04-23');
    });
    it('returns correct date if date given is friday', () => {
        const result = (0, getNextEndOfCampaignDateString_1.getNextEndOfCampaignDateString)(new Date(2022, 3, 22));
        expect(result).toBe('2022-04-23');
    });
    it('returns correct date if date given is saturday', () => {
        const result = (0, getNextEndOfCampaignDateString_1.getNextEndOfCampaignDateString)(new Date(2022, 3, 23));
        expect(result).toBe('2022-04-23');
    });
});
//# sourceMappingURL=getNextEndOfCampaignDateString.test.js.map