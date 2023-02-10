"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAppData_1 = require("./getAppData");
const router = express_1.default.Router();
router.get('/start', getAppData_1.getAppData);
exports.default = router;
//# sourceMappingURL=index.js.map