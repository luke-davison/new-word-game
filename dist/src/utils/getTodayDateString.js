"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayDateString = void 0;
const shared_1 = require("../../client/src/shared");
const getTodayDateString = () => {
    return (0, shared_1.getDateString)(new Date());
};
exports.getTodayDateString = getTodayDateString;
