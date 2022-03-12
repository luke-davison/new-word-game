import './Letter.css';
import './LetterShop.css';

import { useContext } from 'react';

import { GameContext } from '../stores/GameContext';
import { Letter } from './Letter';

export const LetterShop: React.FC = () => {
  const { shopLetters } = useContext(GameContext)

  return (
    <div className="shop-container">
      { shopLetters.map((shopLetter) => (
        <div key={shopLetter.position} className="shop-letter-container">
          <div className="shop-letter-price">
            {"$" + shopLetter.price}
          </div>
          <div className="shop-leeter-inner-container">
            <Letter letter={shopLetter}/>
          </div>
        </div> 
      ))}
    </div>
  )
}