import React, { memo } from "react";
import PropsTypes from "prop-types";
import classnames from "classnames";
import "./index.css";

const MenuItem = memo(function MenuItem(props) {
  const { onPress, title, value, active } = props;
  return (
    <li className={classnames({ active })} onClick={() => onPress(value)}>
      {title}
    </li>
  );
});

MenuItem.prototype = {
  onPress: PropsTypes.func.isRequired,
  title: PropsTypes.string.isRequired,
  value: PropsTypes.oneOfType([PropsTypes.string, PropsTypes.number])
    .isRequired,
  active: PropsTypes.bool.isRequired,
};

const Menu = memo(function Menu(props) {
  const { show, options, onPress, hideMenu } = props;
  return (
    <div>
      {show && <div className="menu-mask" onClick={() => hideMenu()}></div>}
      <div className={classnames("menu", { show })}>
        <div className="menu-title"></div>
        <ul>
          {options &&
            options.map((option) => {
              return (
                <MenuItem
                  key={option.value}
                  onPress={onPress}
                  {...option}
                ></MenuItem>
              );
            })}
        </ul>
      </div>
    </div>
  );
});

Menu.prototype = {
  show: PropsTypes.bool.isRequired,
  options: PropsTypes.array.isRequired,
  onPress: PropsTypes.func.isRequired,
  hideMenu: PropsTypes.func.isRequired,
};
export default Menu;
