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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignCounters = void 0;
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../../../stores/AppContext");
exports.CampaignCounters = (0, mobx_react_lite_1.observer)(() => {
    const { isPlayingCampaignGame, player } = (0, react_1.useContext)(AppContext_1.AppContext);
    if (!isPlayingCampaignGame) {
        return null;
    }
    return (<div className="campaign-counters">
      <div className="funding-counter">
        {`${(player === null || player === void 0 ? void 0 : player.funding) || 0} extra money each game`}
      </div>
      <div className="funding-counter">
        {`${(player === null || player === void 0 ? void 0 : player.points) || 0} total points so far`}
      </div>
      <div className="member-counter">
        {`Is ${(player === null || player === void 0 ? void 0 : player.isMember) ? '' : 'not '} a secret club member`}
      </div>
    </div>);
});
//# sourceMappingURL=CampaignCounters.js.map