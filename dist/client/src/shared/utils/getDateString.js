"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateFromString = exports.getDateString = void 0;
const getDateString = (date) => {
    return `${String(date.getFullYear()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
exports.getDateString = getDateString;
const getDateFromString = (str) => {
    const [year, month, date] = str.split('-');
    return new Date(Number(year), Number(month) - 1, Number(date));
};
exports.getDateFromString = getDateFromString;
//# sourceMappingURL=getDateString.js.map