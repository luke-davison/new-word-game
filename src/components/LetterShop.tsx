import './Letter.css';
import './LetterShop.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useDrag } from 'react-dnd';

import { ShopLetter } from '../models';
import { GameContext } from '../stores/GameContext';
import { Letter } from './Letter';
import { Money } from './Money';

export const LetterShopLetter: React.FC<{ letter: ShopLetter }> = observer(({ letter }) => {

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
  <div ref={drag} className="shop-letter-drag-container">
    <Letter letter={letter}/>
  </div>
)
})

export const LetterShop: React.FC = observer(() => {
  const { shopLetters, onQuickAddLetter } = useContext(GameContext)

  return (
    <div className="shop-container">
      { shopLetters.map((shopLetter, index) => (
        <div key={index} className="shop-letter-container" onDoubleClick={() => onQuickAddLetter(shopLetter)}>
          <div className="shop-letter-price">
            {"$" + shopLetter.price}
          </div>
          <LetterShopLetter letter={shopLetter}/>
        </div>
      ))}
    </div>
  )
})