import React, { memo, useState } from "react";
import PropsTypes from "prop-types";
import classnames from "classnames";
import "./index.css";

const Account = memo(function Account(props) {
  const { price, length } = props;
  /* 展开或关闭浮层 */
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="account">
      <div
        className={classnames("price", { expanded })}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="money">{length * price}</div>
        <div className="amount">支付金额</div>
      </div>
      <div className="button">提交按钮</div>
      <div
        className={classnames("layer", { hidden: !expanded })}
        onClick={() => setExpanded(false)}
      ></div>
      <div className={classnames("detail", { hidden: !expanded })}>
        <div className="title">金额详情</div>
        <ul>
          <li>
            <span>火车票</span>
            <span>￥{price}</span>
            <span>&#xD7;{length}</span>
          </li>
        </ul>
      </div>
    </div>
  );
});
Account.prototype = {
  price: PropsTypes.string,
  length: PropsTypes.array.isRequired,
};
export default Account;
