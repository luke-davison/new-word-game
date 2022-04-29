import { observer } from 'mobx-react-lite';
import { useDrag } from 'react-dnd';

import { LetterInstance } from '../../shared/models/LetterInstance';
import { Letter } from './Letter';

export const DraggableLetter: React.FC<{ letter: LetterInstance }> = observer(({ letter }) => {

  const [dragOptions, drag] = useDrag(
    () => ({
      type: "letter",
      item: letter,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1
      })
    }),
    [letter]
  )
  
  return (
    <div ref={drag} className="letter-drag-container">
      <Letter letter={letter}/>
    </div>
  )
  })