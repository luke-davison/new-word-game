import './Letter.css';

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { ShopLetter } from '../models';
import { GameContext } from '../stores/GameContext';

export const Letter: React.FC<{ letter: ShopLetter }> = observer(({ letter }) => {
  const { onClickLetter } = useContext(GameContext)

  return (
    <div className={"letter-container letter-color-" + letter.color} onClick={() => onClickLetter(letter)}>
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