"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousGamesMenuKey = void 0;
require("./styles/PreviousGamesMenuKey.css");
const mobx_react_lite_1 = require("mobx-react-lite");
exports.PreviousGamesMenuKey = (0, mobx_react_lite_1.observer)(() => {
    return (<div className="previous-games-menu-key">
      <div className="previous-games-menu-key-item">
        <span className="key-item day-attempted"/>
        <span>Attempted</span>
      </div>
      <div className="previous-games-menu-key-item">
        <span className="key-item day-met-target"/>
        <span>Met target</span>
      </div>
      <div className="previous-games-menu-key-item">
        <span className="key-item day-secret-target"/>
        <span>Met secret target</span>
      </div>
      <div className="previous-games-menu-key-item">
        <span className="key-item day-unavailable"/>
        <span>Unavailable</span>
      </div>
    </div>);
});
//# sourceMappingURL=PreviousGamesMenuKey.js.map