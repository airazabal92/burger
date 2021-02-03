import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Hamburger from "../../UI/Hamburger/Hamburger";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Hamburger show={props.show} />
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationItems></NavigationItems>
    </nav>
  </header>
);

export default toolbar;
