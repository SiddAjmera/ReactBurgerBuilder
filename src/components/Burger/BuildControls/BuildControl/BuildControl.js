import React from 'react';

import cssClasses from './BuildControl.css';

const buildControl = (props) => {
  return (
    <div className={cssClasses.BuildControl}>
      <div className={cssClasses.Label}>{props.label}</div>
      <button disabled={props.disableInfo} className={cssClasses.Less} onClick={props.less}>Less</button>
      <button className={cssClasses.More} onClick={props.more}>More</button>
    </div>
  );
}

export default buildControl;