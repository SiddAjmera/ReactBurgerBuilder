import React from 'react';

import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import cssClasses from './Modal.css';

const modal = (props) => {
    return (
        <Aux>
            <Backdrop 
                show={props.show}
                clicked={props.backdropClick}>
                <div 
                    className={cssClasses.Modal}
                    style={{
                        transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
                        opacity: props.show ? '1': '0'
                    }}>
                    {props.children}
                </div>
            </Backdrop>
        </Aux>
    );
}

export default modal;