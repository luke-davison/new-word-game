"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingOverlay = void 0;
require("./styles/LoadingOverlay.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const AppContext_1 = require("../../stores/AppContext");
exports.LoadingOverlay = (0, mobx_react_lite_1.observer)(() => {
    const { isError, isLoading } = (0, react_1.useContext)(AppContext_1.AppContext);
    const [loadingDelayElapsed, setLoadingDelayElapsed] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            setLoadingDelayElapsed(true);
        }, 600);
    }, []);
    if (!isError && !isLoading) {
        return null;
    }
    let classNames = 'loading-overlay';
    if (loadingDelayElapsed || isError) {
        classNames += ' show-overlay';
    }
    return (<div className={classNames}>
      {isError && (<div className="error-text">
          An error occurred - please refresh and try again
        </div>)}
      {isLoading && (<div className="loading-text">
          Loading
        </div>)}
    </div>);
});
//# sourceMappingURL=LoadingOverlay.js.map