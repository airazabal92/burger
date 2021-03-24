import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    this.setState({
      ingredients: this.props.history.location.ingredients,
      totalPrice: this.props.history.location.price
    });
  }

  componentDidUpdate() {
    console.log(this.state.ingredients);
  }

  cancelHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    console.log("CHECKOUT");
    console.log(this.props);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancel={this.cancelHandler}
          checkoutContinue={this.continueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            ></ContactData>
          )}
        />
      </div>
    );
  }
}

export default Checkout;
