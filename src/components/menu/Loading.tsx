import "./styles/Loading.css"

import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';

export const Loading: FunctionComponent = observer(() => {
  return (
    <div className="loading-indicator">
      Loading
    </div>
  )
})