import './styles/MenuWrapper.css';

import { observer } from 'mobx-react-lite';

import { AppTitle } from './AppTitle';
import { FunctionComponent } from 'react';

export const MenuWrapper: FunctionComponent = observer(props => {
  return (
    <div className="menu-wrapper">
      <AppTitle/>
      {props.children}
    </div>
  );
})