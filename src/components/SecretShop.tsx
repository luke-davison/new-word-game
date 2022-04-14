import './LetterShop.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { AppContext } from '../stores/AppContext';
import { CampaignContext } from '../stores/CampaignContext';
import { GameContext } from '../stores/GameContext';
import { DraggableLetter } from './DraggableLetter';

export const SecretShop: React.FC = observer(() => {
  const { isPlayingCampaignGame } = useContext(AppContext)
  const campaignStore = useContext(CampaignContext)
  const { secretShopLetters, onQuickAddLetter } = useContext(GameContext)

  if (!isPlayingCampaignGame) {
    return null
  }

  if (!campaignStore.player.isMember || secretShopLetters.length === 0) {
    return null
  }

  return (
    <div className="shop-container">
      { secretShopLetters.map((shopLetter, index) => (
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