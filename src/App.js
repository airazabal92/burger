import React, { Component } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./components/Checkout/Checkout";
import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Orders from "./containers/Orders/Orders";

import Layout from "./components/Layout/Layout";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Layout>
              <Route exact path="/" component={BurgerBuilder} />
              <Route path="/orders" component={Orders} />
              <Route path="/checkout" component={Checkout} />
            </Layout>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
