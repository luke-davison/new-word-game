import "./styles/DragPreviewLayer.css"

import { observer } from "mobx-react-lite";
import { useDragLayer, XYCoord } from "react-dnd";
import { Letter } from "./Letter";

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

export const DragPreviewLayer: React.FunctionComponent = observer(() => {
  const {
    isDragging,
    item,
    initialOffset,
    currentOffset
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  if (!isDragging) {
    return null
  }

  const previewImage = item ? (
    <Letter letter={item}/>
  ) : undefined
  
  return (
    <div className="drag-preview-layer">
      <div className="drag-preview" style={getItemStyles(initialOffset, currentOffset)}>
        {previewImage}
      </div>
    </div>
  )
})