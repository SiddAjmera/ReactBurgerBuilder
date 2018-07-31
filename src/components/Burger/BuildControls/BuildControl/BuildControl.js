import React from 'react';

import cssClasses from './BuildControl.css';

const buildControl = (props) => {
  return (
    <div className={cssClasses.BuildControl}>
      <div>{props.label}</div>
      <button onClick={props.less}>Less</button>
      <button onClick={props.more}>More</button>
    </div>
  );
}

export default buildControl;