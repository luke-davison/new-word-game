import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { GameContext } from '../stores/GameContext';

export const Submit: React.FC = observer(() => {
  const { onSubmit, submitText } = useContext(GameContext)

  return (
    <div className="submit-area">
      <button className="submit-button" onClick={onSubmit}>Submit</button>
      {submitText && (
        <div className="submit-text">{submitText}</div>
      )}
    </div>
  )
})