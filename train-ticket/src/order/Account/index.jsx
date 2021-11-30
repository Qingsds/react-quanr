import React, { memo } from "react";
import PropsTypes from "prop-types";
import "./index.css";

const Account = memo(function Account(props) {
  return <div className="account">Account</div>;
});
Account.prototype = {};
export default Account;
