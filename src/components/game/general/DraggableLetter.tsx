import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { LetterInstance } from '../../../models/LetterInstance';
import { Letter } from './Letter';

export const DraggableLetter: React.FC<{ letter: LetterInstance }> = observer(({ letter }) => {

  const [dragOptions, drag, preview] = useDrag(
    () => ({
      type: "letter",
      item: letter,
      collect: (monitor) => ({
        opacity: monitor.isDragging()
      })
    }),
    [letter]
  )

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  
  return (
    <div ref={drag} className="letter-drag-container">
      <Letter letter={letter}/>
    </div>
  )
  })