import React, { Component } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./components/Checkout/Checkout";
import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
            </Switch>
          </BrowserRouter>
        </Layout>
      </div>
    );
  }
}

export default App;
