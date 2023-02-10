"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popup = void 0;
require("./styles/Popup.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const X_OFFSET = 0;
const Y_OFFSET = 15;
exports.Popup = (0, mobx_react_lite_1.observer)(({ children, elementId, onClose, className }) => {
    const popupRef = (0, react_1.useRef)(null);
    const timeout = (0, react_1.useRef)();
    const [position, setPosition] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const listener = () => {
            onClose();
        };
        document.body.addEventListener('click', listener);
        return () => document.body.removeEventListener('click', listener);
    }, [onClose]);
    const recalculatePosition = (0, react_1.useCallback)(() => {
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element && popupRef.current) {
                const elementRect = element.getBoundingClientRect();
                const popupRect = popupRef.current.getBoundingClientRect();
                const popupWidth = popupRef.current.offsetWidth;
                const popupHeight = popupRef.current.offsetHeight;
                const isAbove = elementRect.bottom + Y_OFFSET + popupRect.height > window.innerHeight;
                const isLeft = elementRect.left + X_OFFSET + popupRef.current.offsetWidth > window.innerWidth;
                setPosition({
                    left: isLeft ? elementRect.right - X_OFFSET - popupWidth : elementRect.left + X_OFFSET,
                    top: isAbove ? elementRect.top - Y_OFFSET - popupHeight : elementRect.bottom + Y_OFFSET
                });
            }
        }
    }, [elementId]);
    (0, react_1.useLayoutEffect)(() => {
        setTimeout(() => {
            recalculatePosition();
        }, 1);
        timeout.current = setInterval(recalculatePosition, 1000);
    }, [recalculatePosition]);
    (0, react_1.useEffect)(() => {
        return () => {
            if (timeout.current !== undefined) {
                clearInterval(timeout.current);
            }
        };
    }, []);
    const style = elementId
        ? (position || { opacity: 0 }) // opacity 0 will hide the element on the first render, so the position can be calculated
        : undefined;
    return (<div ref={popupRef} className={'popup ' + className} style={style}>
      {children}
    </div>);
});
//# sourceMappingURL=Popup.js.map