import './Letter.css';

import { observer } from 'mobx-react-lite';

import { ShopLetter } from '../models';

export const Letter: React.FC<{ letter: ShopLetter }> = observer(({ letter }) => {
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
})