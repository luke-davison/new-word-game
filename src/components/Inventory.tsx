import './LetterShop.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { GameContext } from '../stores/GameContext';
import { DraggableLetter } from './DraggableLetter';

export const Inventory: React.FC = observer(() => {
  const { isPlayingCampaignGame } = useContext(AppContext)
  const { inventory, onQuickAddLetter } = useContext(GameContext)

  if (!isPlayingCampaignGame) {
    return null
  }

  return (
    <div className="shop-container">
      { inventory.map((shopLetter, index) => (
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