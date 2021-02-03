import React from "react";
import classes from "./Hamburger.module.css";

const hamburger = (props) => {
  return (
    <img
      onClick={props.show}
      className={classes.Hamburger}
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
    ></img>
  );
};

export default hamburger;
