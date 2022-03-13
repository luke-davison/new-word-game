import './Letter.css';
import './LetterShop.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { GameContext } from '../stores/GameContext';
import { Letter } from './Letter';

const ShopDroppable: React.FC<{ letterId: string }> = ({ letterId, children }) => {
  return (
    <Droppable droppableId={"droppable-" + letterId} isDropDisabled={true}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Draggable draggableId={letterId} index={0}>
            {(provided) => (
              <div ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
                { children }
              </div>
            )}
          </Draggable>
        </div>
      )}
    </Droppable>
  )
}

export const LetterShop: React.FC = observer(() => {
  const { shopLetters } = useContext(GameContext)

  return (
    <div className="shop-container">
      { shopLetters.map((shopLetter) => (
        <div key={shopLetter.position} className="shop-letter-container">
          <div className="shop-letter-price">
            {"$" + shopLetter.price}
          </div>
          <ShopDroppable letterId={shopLetter.id}>
          <div className="shop-leeter-inner-container">
            <Letter letter={shopLetter}/>
          </div>
      </ShopDroppable>
        </div>
      ))}
    </div>
  )
})