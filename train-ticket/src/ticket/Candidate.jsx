import React, { memo, useCallback,useState } from "react";
import PropTypes from "prop-types";
import "./Candidate.css";
import { nanoid } from "nanoid";

const Channel = memo(function Channel(props) {
  const { name, desc, type } = props;
  return (
    <div className="channel">
      <div className="middle">
        <div className="name">{name}</div>
        <div className="desc">{desc}</div>
      </div>
      <a href="" className="buy-wrapper">
        <div className="buy">买票</div>
      </a>
    </div>
  );
});
Channel.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const Seat = memo(function Seat(props) {
  const { type, priceMsg, ticketsLeft, channels, index, expanded, toggle } =
    props;
  return (
    <li>
      <div className="bar" onClick={() => toggle(index)}>
        <span className="seat">{type}</span>
        <span className="price">
          <i>￥</i>
          {priceMsg}
        </span>
        <span className="btn">{expanded ? "收起" : "预定"}</span>
        <span className="num">{ticketsLeft}</span>
      </div>
      <div
        className="channels"
        style={{ height: expanded ? channels.length * 55 + "px" : 0 }}
      >
        {channels.map((channel) => {
          return <Channel type={type} {...channel} key={nanoid()} />;
        })}
      </div>
    </li>
  );
});
Seat.propTypes = {
  type: PropTypes.string.isRequired,
  priceMsg: PropTypes.string.isRequired,
  ticketsLeft: PropTypes.string.isRequired,
  channels: PropTypes.array.isRequired,
};

const Candidate = memo(function Candidate(props) {
  const { tickets } = props;
  const [expand, setExpand] = useState(-1);
  const toggle = useCallback(
    (index) => {
      setExpand(expand === index ? -1 : index);
    },
    [expand]
  );
  return (
    <div className="candidate">
      {tickets.map((ticket, index) => {
        return (
          <Seat
            key={nanoid()}
            {...ticket}
            index={index}
            expanded={expand === index}
            toggle={toggle}
          />
        );
      })}
    </div>
  );
});
Candidate.propTypes = {
  tickets: PropTypes.array.isRequired,
};

export default Candidate;
