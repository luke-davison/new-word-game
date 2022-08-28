import './styles/LetterShop.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { GameContext } from '../../../stores/GameContext';
import { DraggableLetter } from './DraggableLetter';
import { Letter } from './Letter';

export const LetterShop: React.FC = observer(() => {
  const { getIsLetterUsed, inventory, secretShopLetters, shopLetters, onQuickAddLetter } = useContext(GameContext)

  return (
    <div className="shop-container">
      { shopLetters.map((shopLetter, index) => {
        const className = "shop-letter-container shop-letter-char-" + (shopLetter.char || "empty")
        return (
          <div key={index} className={className} onDoubleClick={() => onQuickAddLetter(shopLetter)}>
            <div className="shop-letter-price">
              {"$" + shopLetter.price}
            </div>
            <DraggableLetter letter={shopLetter}/>
          </div>
        )
      })}
      { secretShopLetters.map((shopLetter, index) => (
        <div key={index} className="shop-letter-container secret-letter" onDoubleClick={() => onQuickAddLetter(shopLetter)}>
          <div className="shop-letter-price">
            {"$" + shopLetter.price}
          </div>
          <DraggableLetter letter={shopLetter} label="Secret"/>
        </div>
      ))}
      { inventory.map((inventoryLetter, index) => {
        const classNames = "inventory-letter-container inventory-letter-" + (index + 1)
        return (
          <div key={index} className={classNames} onDoubleClick={() => onQuickAddLetter(inventoryLetter)}>
            { getIsLetterUsed(inventoryLetter) ? (
              <Letter letter={inventoryLetter} disabled/>
            ) :(
              <DraggableLetter letter={inventoryLetter} label="Saved"/>
            )}
          </div>
        )
      })}

    </div>
  )
})