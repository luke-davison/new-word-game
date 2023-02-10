"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuWrapper = void 0;
require("./styles/MenuWrapper.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const AppTitle_1 = require("./AppTitle");
exports.MenuWrapper = (0, mobx_react_lite_1.observer)(props => {
    return (<div className="menu-wrapper">
      <AppTitle_1.AppTitle />
      {props.children}
    </div>);
});
//# sourceMappingURL=MenuWrapper.js.map