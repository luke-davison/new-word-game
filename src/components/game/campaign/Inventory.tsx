import "./styles/Inventory.css"

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { AppContext } from '../../../stores/AppContext';
import { GameContext } from '../../../stores/GameContext';
import { DraggableLetter } from '../general/DraggableLetter';
import { Letter } from "../general/Letter";

export const Inventory: React.FC = observer(() => {
  const { isPlayingCampaignGame } = useContext(AppContext)
  const { inventory, onQuickAddLetter, getIsLetterUsed } = useContext(GameContext)

  if (!isPlayingCampaignGame) {
    return null
  }

  return (
    <div className="inventory-container">
      <div className="inventory">
        <div className="shop-container">
          { inventory.map((inventoryLetter, index) => (
            <div key={index} className="inventory-letter-container" onDoubleClick={() => onQuickAddLetter(inventoryLetter)}>
              { getIsLetterUsed(inventoryLetter) ? (
                <Letter letter={inventoryLetter} disabled/>
              ) :(
                <DraggableLetter letter={inventoryLetter} label="Saved"/>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})