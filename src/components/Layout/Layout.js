import React from 'react';

import Aux from '../../hoc/Aux';
import cssClasses from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => {
  return (
    <Aux>
      <div>
        <Toolbar />
      </div>
      <main className={cssClasses.Content}>
        {props.children}
      </main>
    </Aux>
  );
}

export default layout;
