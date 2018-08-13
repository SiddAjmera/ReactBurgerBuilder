import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import cssClasses from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

  state = {
    showSideDrawer: true
  };

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }

  sideDrawerOpenHandler = () => {
    this.setState({
      showSideDrawer: true
    });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    });
  }

  render () {
    return <Aux>
      <div>
        <Toolbar opened={this.sideDrawerToggleHandler}/>
        <SideDrawer closed={this.sideDrawerToggleHandler} show={this.state.showSideDrawer}/>
      </div>
      <main className={cssClasses.Content}>
        {this.props.children}
      </main>
    </Aux>;
  }
}

export default Layout;
