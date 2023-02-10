"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
require("./styles/Counters.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const Money_1 = require("./Money");
const WordPoints_1 = require("./WordPoints");
const react_1 = require("react");
const GameContext_1 = require("../../../stores/GameContext");
exports.Counters = (0, mobx_react_lite_1.observer)(() => {
    const { isValidText } = (0, react_1.useContext)(GameContext_1.GameContext);
    return (<div className="counters-container">
      <Money_1.Money />
      <div className="status-text">
        {isValidText || ' '}
      </div>
      <WordPoints_1.WordPoints />
    </div>);
});
//# sourceMappingURL=Counters.js.map