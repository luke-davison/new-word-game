import './Counters.css';

import { observer } from 'mobx-react-lite';

import { Money } from './Money';
import { WordPoints } from './WordPoints';

export const Counters: React.FC = observer(() => {
  return (
    <div className="counters-container">
      <Money/>
      <WordPoints/>
    </div>
  )
})