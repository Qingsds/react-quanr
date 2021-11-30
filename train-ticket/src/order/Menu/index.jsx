import React, { memo } from "react";
import PropsTypes from "prop-types";
import "./index.css";

const Menu = memo(function Menu(props) {
  return <div className="menu">Menu</div>;
});

Menu.prototype = {};
export default Menu;
