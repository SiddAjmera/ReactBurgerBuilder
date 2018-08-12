import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import cssClasses from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
  return (
    <div className={cssClasses.BuildControls}>
      <p>Total Price: <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map(control => <BuildControl 
        key={control.label} 
        label={control.label}
        more={() => props.more(control.type)} 
        less={() => props.less(control.type)}
        disableInfo={props.disableInfo[control.type]}/>)}
      <button 
        disabled={props.disableCheckout} 
        className={cssClasses.OrderButton}
        onClick={props.checkout}>
        ORDER NOW
      </button>
    </div>
  );
}

export default buildControls;