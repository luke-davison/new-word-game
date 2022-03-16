import './Letter.css';

import { observer } from 'mobx-react-lite';

import { ShopLetter } from '../models';

export const Letter: React.FC<{ letter: ShopLetter }> = observer(({ letter }) => {
  return (
    <div className={"letter-container letter-color-" + letter.color}>
      <div className="letter-character">
        { letter.letter }
      </div>
      <div className="letter-points">
        { letter.points }
      </div>
        { letter.ability && (
          <div className="letter-ability">
            <img src={letter.ability.image}/>
            {letter.ability.points !== undefined && (
              <div className="letter-ability-points">
                {letter.ability.points}
              </div>
            )}
            {letter.ability.multiplier !== undefined && (
              <div className="letter-ability-multiplier">
                {'x' + letter.ability.multiplier}
              </div>
            )}
      </div>
        )}
    </div>
  )
})