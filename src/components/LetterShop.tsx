import './LetterShop.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { GameContext } from '../stores/GameContext';
import { DraggableLetter } from './DraggableLetter';

export const LetterShop: React.FC = observer(() => {
  const { shopLetters, onQuickAddLetter } = useContext(GameContext)

  return (
    <div className="shop-container">
      { shopLetters.map((shopLetter, index) => (
        <div key={index} className="shop-letter-container" onDoubleClick={() => onQuickAddLetter(shopLetter)}>
          <div className="shop-letter-price">
            {"$" + shopLetter.price}
          </div>
          <DraggableLetter letter={shopLetter}/>
        </div>
      ))}
    </div>
  )
})