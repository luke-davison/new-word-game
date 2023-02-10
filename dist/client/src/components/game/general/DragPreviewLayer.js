"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragPreviewLayer = void 0;
require("./styles/DragPreviewLayer.css");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_dnd_1 = require("react-dnd");
const Letter_1 = require("./Letter");
function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none'
        };
    }
    let { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform
    };
}
exports.DragPreviewLayer = (0, mobx_react_lite_1.observer)(() => {
    const { isDragging, item, initialOffset, currentOffset } = (0, react_dnd_1.useDragLayer)(monitor => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }));
    if (!isDragging) {
        return null;
    }
    const previewImage = item ? (<Letter_1.Letter letter={item}/>) : undefined;
    return (<div className="drag-preview-layer">
      <div className="drag-preview" style={getItemStyles(initialOffset, currentOffset)}>
        {previewImage}
      </div>
    </div>);
});
//# sourceMappingURL=DragPreviewLayer.js.map