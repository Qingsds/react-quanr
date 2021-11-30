import React, { memo } from "react";
import PropsTypes from "prop-types";
import "./index.css";

const Passenger = memo(function Passengers(props) {
  const {
    id,
    name,
    gender,
    ticketType,
    followAdult,
    licenceId,
    birthday,
    onRemove,
    onUpdate,
  } = props;

  const isAdult = ticketType === "adult";
  return (
    <li className="passenger">
      <i
        className="delete"
        onClick={() => {
          onRemove(id);
        }}
      >
        -
      </i>
      <ol className="items">
        <li className="item">
          <label className="label name">姓名</label>
          <input
            type="text"
            placeholder="乘客姓名"
            className="input name"
            onChange={(e) => {
              onUpdate(id, { name: e.target.value });
            }}
            value={name}
          />
          <label className="ticket-type">{isAdult ? "成人票" : "儿童票"}</label>
        </li>

        {isAdult && (
         <li className="item">
         <label className="label licence">身份证</label>
         <input
           type="text"
           placeholder="身份证"
           className="input licence"
           onChange={(e) => {
             onUpdate(id, { licenceId: e.target.value });
           }}
           value={licenceId}
         />
       </li>
        )}
        {!isAdult &&
          <li className="item">
          <label className="label gender">性别</label>
          <input
            type="text"
            placeholder="性别"
            className="input gender"
            onChange={(e) => {
              onUpdate(id, { gender: e.target.value });
            }}
            value={gender}
          />
        </li>
        
        }

      </ol>
    </li>
  );
});
Passenger.prototype = {
  id: PropsTypes.string.isRequired,
  name: PropsTypes.string,
  gender: PropsTypes.string,
  ticketType: PropsTypes.string.isRequired,
  followAdult: PropsTypes.number,
  licenceId: PropsTypes.string,
  birthday: PropsTypes.string,
  onRemove: PropsTypes.func.isRequired,
};

const Passengers = memo(function Passengers(props) {
  const { passengers, createAdult, createChild, onRemove, updatePassenger } =
    props;
  return (
    <div className="passengers">
      <ul>
        {passengers.map((passenger) => {
          return (
            <Passenger
              key={passenger.id}
              {...passenger}
              onRemove={onRemove}
              onUpdate={updatePassenger}
            />
          );
        })}
      </ul>
      <section className="add">
        <div className="adult" onClick={() => createAdult()}>
          添加成人
        </div>
        <div className="child" onClick={() => createChild()}>
          添加儿童
        </div>
      </section>
    </div>
  );
});

Passengers.prototype = {
  passengers: PropsTypes.array,
  createAdult: PropsTypes.func.isRequired,
  createChild: PropsTypes.func.isRequired,
};
export default Passengers;