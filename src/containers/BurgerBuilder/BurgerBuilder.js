import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import Aux from "../../hoc/Aux";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchaseMode: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get(
        "https://my-burger-16ad4-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ing) {
    const ingredients = ing;

    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })

      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtraction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchaseMode: true });
  };

  modalClose = () => {
    this.setState({ purchaseMode: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    //alert("You continued!");
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Amanda Irazabal",
        address: {
          street: "TestStreet",
          zipCode: "45146",
          country: "US"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
    this.modalClose();
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}></Burger>
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            finalPrice={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          ></BuildControls>
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice.toFixed(2)}
          purchaseCancelled={this.modalClose}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          loading={this.state.loading}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchaseMode} modalClosed={this.modalClose}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
