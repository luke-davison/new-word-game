import './Letter.css';

import { ShopLetter } from '../models';

export const Letter: React.FC<{ letter: ShopLetter }> = ({ letter }) => {
  return (
    <div className={"letter-container letter-position-" + letter.position}>
      <div className="letter-character">
        { letter.letter }
      </div>
      <div className="letter-points">
        { letter.points }
      </div>
    </div>
  )
}