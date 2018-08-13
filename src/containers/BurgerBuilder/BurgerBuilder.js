import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldIngredientCount = this.state.ingredients[type];
    const newIngredientCount = oldIngredientCount + 1;
    const updatedIngredients = { 
      ...this.state.ingredients
    };
    updatedIngredients[type] = newIngredientCount;
    const updatedPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchasableState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldIngredientCount = this.state.ingredients[type];
    if(oldIngredientCount > 0) {
      const newIngredientCount = oldIngredientCount - 1;
      const updatedIngredients = { 
        ...this.state.ingredients
      };
      updatedIngredients[type] = newIngredientCount;
      const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice
      });
      this.updatePurchasableState(updatedIngredients);
    }
  }

  checkoutHandler = () => {
    this.setState({ purchasing: true });
  }

  closeModal = () => {
    this.setState({ purchasing: false });
  }

  continuePurchase = () => {
    alert('You Continue!');
  }

  render() {

    const disableInfo = {
      ...this.state.ingredients
    };

    for(let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          backdropClick={this.closeModal}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseContinued={this.continuePurchase}
            purchaseCancelled={this.closeModal}
            price={this.state.totalPrice.toFixed(2)}/>
        </Modal>
        <Burger 
          ingredients={this.state.ingredients}/>
        <BuildControls 
          price={this.state.totalPrice}
          more={this.addIngredientHandler}
          less={this.removeIngredientHandler}
          disableInfo={disableInfo}
          disableCheckout={!this.state.purchasable}
          checkout={this.checkoutHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
