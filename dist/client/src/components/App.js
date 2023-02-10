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
require("./App.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = __importStar(require("react"));
const AppContext_1 = require("../stores/AppContext");
const AppStore_1 = require("../stores/AppStore");
const Menu_1 = require("./menu/Menu");
const LoadingOverlay_1 = require("./general/LoadingOverlay");
const App = (0, mobx_react_lite_1.observer)(() => {
    const [appStore] = (0, react_1.useState)(new AppStore_1.AppStore());
    (0, react_1.useEffect)(() => {
        appStore.loadAppData();
    }, [appStore]);
    return (<AppContext_1.AppContext.Provider value={appStore}>
      <div className="App">
        <LoadingOverlay_1.LoadingOverlay />
        <Menu_1.Menu />
      </div>
    </AppContext_1.AppContext.Provider>);
});
exports.default = App;
//# sourceMappingURL=App.js.map