"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./IAppData"), exports);
__exportStar(require("./ICampaignGame"), exports);
__exportStar(require("./IDailyGame"), exports);
__exportStar(require("./IGame"), exports);
__exportStar(require("./IGameStats"), exports);
__exportStar(require("./ILetter"), exports);
__exportStar(require("./IPlayer"), exports);
__exportStar(require("./IUser"), exports);
__exportStar(require("./IUserScore"), exports);
__exportStar(require("./ISubmitWord"), exports);
