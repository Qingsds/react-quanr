import React, { memo, useMemo } from "react";
import PropsTypes from "prop-types";
import "./index.css";

const Passenger = memo(function Passengers(props) {
  const {
    id,
    name,
    gender,
    ticketType,
    licenceId,
    birthday,
    onRemove,
    onUpdate,
    showGenderMenu,
    showFollowAdult,
    followAdultName,
    showTicketType,
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
          <label
            className="ticket-type"
            onClick={() => {
              showTicketType(id);
            }}
          >
            {isAdult ? "成人票" : "儿童票"}
          </label>
        </li>

        {isAdult && (
          <li className="item">
            <label className="label licenceNo">身份证</label>
            <input
              type="text"
              placeholder="证件号码"
              className="input licenceNo"
              onChange={(e) => {
                onUpdate(id, { licenceId: e.target.value });
              }}
              value={licenceId}
            />
          </li>
        )}
        {!isAdult && (
          <li className="item arrow">
            <label className="label gender">性别</label>
            <input
              type="text"
              placeholder="请选择"
              className="input gender"
              onClick={() => showGenderMenu(id)}
              readOnly
              value={gender === "male" ? "男" : gender === "female" ? "女" : ""}
            />
          </li>
        )}
        {!isAdult && (
          <li className="item">
            <label className="label birthday">出生日期</label>
            <input
              type="text"
              placeholder="如 19691216"
              className="input birthday"
              onChange={(e) => {
                onUpdate(id, { birthday: e.target.value });
              }}
              value={birthday}
            />
          </li>
        )}
        {!isAdult && (
          <li
            className="item arrow"
            onClick={() => {
              showFollowAdult(id);
            }}
          >
            <label className="label followAdult">同行成人</label>
            <input
              type="text"
              placeholder="请选择"
              className="input followAdult"
              readOnly
              value={followAdultName}
            />
          </li>
        )}
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
  showGenderMenu: PropsTypes.func.isRequired,
  showFollowAdult: PropsTypes.func.isRequired,
  followAdultName: PropsTypes.string,
  showTicketType: PropsTypes.string,
};

const Passengers = memo(function Passengers(props) {
  const {
    passengers,
    createAdult,
    createChild,
    onRemove,
    updatePassenger,
    showGenderMenu,
    showFollowAdult,
    showTicketType,
  } = props;

  const followAdultMap = useMemo(() => {
    const map = {};
    for (const passenger of passengers) {
      /* 创建一个新对象。将id设为key name设为value */
      map[passenger.id] = passenger.name;
    }
    return map;
  }, [passengers]);

  return (
    <div className="passengers">
      <ul>
        {passengers.map((passenger) => {
          return (
            <Passenger
              key={passenger.id}
              followAdultName={followAdultMap[passenger.followAdult]}
              {...passenger}
              onRemove={onRemove}
              onUpdate={updatePassenger}
              showGenderMenu={showGenderMenu}
              showFollowAdult={showFollowAdult}
              showTicketType={showTicketType}
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
  showGenderMenu: PropsTypes.func.isRequired,
  onRemove: PropsTypes.func.isRequired,
  updatePassenger: PropsTypes.func.isRequired,
  showFollowAdult: PropsTypes.func.isRequired,
  showTicketType: PropsTypes.func.isRequired,
};
export default Passengers;
