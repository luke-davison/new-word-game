"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
require("./styles/Game.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const react_device_detect_1 = require("react-device-detect");
const react_dnd_1 = require("react-dnd");
const react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
const react_dnd_touch_backend_1 = require("react-dnd-touch-backend");
const AppContext_1 = require("../../../stores/AppContext");
const GameContext_1 = require("../../../stores/GameContext");
const GameStore_1 = require("../../../stores/GameStore");
const GameArea_1 = require("./GameArea");
const PageButtons_1 = require("./PageButtons");
const AppTitle_1 = require("../../menu/AppTitle");
const DragPreviewLayer_1 = require("./DragPreviewLayer");
exports.Game = (0, mobx_react_lite_1.observer)(() => {
    const appStore = (0, react_1.useContext)(AppContext_1.AppContext);
    const [gameStore] = (0, react_1.useState)(new GameStore_1.GameStore(appStore));
    const backend = react_device_detect_1.isMobile ? react_dnd_touch_backend_1.TouchBackend : react_dnd_html5_backend_1.HTML5Backend;
    return (<GameContext_1.GameContext.Provider value={gameStore}>
      <react_dnd_1.DndProvider backend={backend}>
        <DragPreviewLayer_1.DragPreviewLayer />
        <div className="game-container">
          <div className="game-container-title">
            <AppTitle_1.AppTitle />
          </div>
          <div className="game-container-inner">
            <GameArea_1.GameArea />
            <PageButtons_1.PageButtons />
          </div>
        </div>
      </react_dnd_1.DndProvider>
    </GameContext_1.GameContext.Provider>);
});
//# sourceMappingURL=Game.js.map