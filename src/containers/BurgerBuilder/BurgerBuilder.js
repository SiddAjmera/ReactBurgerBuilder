import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
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
      totalPrice: +updatedPrice.toFixed(2)
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
        totalPrice: +updatedPrice.toFixed(2)
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
    this.setState({
      loading: true
    });
    // alert('You Continue!');
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Sidd Ajmera',
        address: {
          street: '123 NE St.',
          zipcode: '411057',
          country: 'India'
        },
        email: 'siddajmera@outlook.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          purchasing: false
        });
      });
  }

  componentDidMount() {
    axios.get('https://react-burger-builder-spa.firebaseio.com/ingredients.json')
      .then(res => this.setState({ ingredients: res.data }))
      .catch(error => this.setState({ error: error }));
  }

  render() {

    const disableInfo = {
      ...this.state.ingredients
    };

    for(let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderingTemplate;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if(this.state.ingredients) {
      burger = (
        <Aux>
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
      orderingTemplate = <OrderSummary 
        ingredients={this.state.ingredients}
        purchaseContinued={this.continuePurchase}
        purchaseCancelled={this.closeModal}
        price={this.state.totalPrice.toFixed(2)}/>; 
    }

    if(this.state.loading) {
      orderingTemplate = <Spinner />;
    }
    
    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          backdropClick={this.closeModal}>
          {orderingTemplate}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
