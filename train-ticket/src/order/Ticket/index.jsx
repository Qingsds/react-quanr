import React, { memo } from "react";
import PropsTypes from "prop-types";
import "./index.css";

const Ticket = memo(function Ticket(props) {
  const { type, price } = props;
  return (
    <div className="ticket">
      <p>
        <span className="ticket-type">{type}</span>
        <span className="ticket-price">{price}</span>
      </p>
      <div className="label">坐席</div>
    </div>
  );
});

Ticket.prototype = {
  type: PropsTypes.string.isRequired,
  price: PropsTypes.oneOfType([PropsTypes.string, PropsTypes.number]),
};
export default Ticket;
