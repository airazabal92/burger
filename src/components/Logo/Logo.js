import React from "react";
import classes from "./Logo.module.css";
import burgerLogo from "../../assets/images/burger-logo.png";

const logo = (props) => (
  <div
    className={classes.Logo}
    style={{ marginBottom: props.margin, height: props.height }}
  >
    <img alt="MyBurger" src={burgerLogo}></img>
  </div>
);

export default logo;
