import React from 'react';

import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import cssClasses from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {

  let attachedClasses = [cssClasses.SideDrawer];
  props.show ? attachedClasses.push(cssClasses.Open) : attachedClasses.push(cssClasses.Close);

  return (
    <Aux>
      <Backdrop 
        clicked={props.closed} 
        show={props.show}/>
      <div className={attachedClasses.join(' ')}>
        <div className={cssClasses.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
