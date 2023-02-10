"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggableLetter = void 0;
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const react_dnd_1 = require("react-dnd");
const react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
const Letter_1 = require("./Letter");
exports.DraggableLetter = (0, mobx_react_lite_1.observer)(props => {
    const { letter } = props;
    const [{ isDragging }, drag, preview] = (0, react_dnd_1.useDrag)(() => ({
        type: 'letter',
        item: letter,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }), [letter]);
    (0, react_1.useEffect)(() => {
        preview((0, react_dnd_html5_backend_1.getEmptyImage)(), { captureDraggingState: true });
    }, [preview]);
    const style = isDragging && letter.position !== undefined ? { opacity: 0 } : undefined;
    return (<div ref={drag} className="letter-drag-container" style={style}>
      <Letter_1.Letter {...props}/>
    </div>);
});
//# sourceMappingURL=DraggableLetter.js.map