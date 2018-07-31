import React from 'react';

import cssClasses from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientName => {
      return [...Array(props.ingredients[ingredientName])]
        .map((_, index) => <BurgerIngredient key={ingredientName + index} type={ingredientName} />)
    })
    .reduce((arr, item) => {
      return arr.concat(item);
    }, []);

  if(transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={cssClasses.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
