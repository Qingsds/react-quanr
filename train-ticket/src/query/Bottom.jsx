import React, { memo, useState, useCallback, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { nanoid } from "nanoid";
import Slider from "./Slider.jsx";
import { ORDER_DEPART, ORDER_DURATION } from "./constant";
import "./Bottom.css";

function checkedReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case "reset":
      return {};
    case "toggle":
      const newCheckedMap = { ...state };
      if (payload in state) {
        delete newCheckedMap[payload];
      } else {
        newCheckedMap[payload] = true;
      }
      return newCheckedMap;
    default:
      return state;
  }
}

const Filter = memo(function Filter(props) {
  const { name, value, toggle, checked } = props;
  return (
    <li className={classnames({ checked })} onClick={() => toggle(value)}>
      {name}
    </li>
  );
});

const Options = memo(function Options(props) {
  const { title, options, checkedMap, dispatch } = props;
  /* 此方法用于选中和取消选项 */
  const toggle = useCallback(
    (value) => {
      dispatch({ type: "toggle", payload: value });
    },
    [dispatch]
  );
  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {options.map((option) => {
          return (
            <Filter
              key={nanoid()}
              {...option}
              toggle={toggle}
              checked={option.value in checkedMap}
            />
          );
        })}
      </ul>
    </div>
  );
});
/* 点击筛选按钮弹出浮层 */
const BottomModal = memo(function BottomModal(props) {
  const {
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    toggleIsFiltersVisible,
  } = props;
  /* 这里使用回调可以优化性能，只有在参数调用时，才会生成 */
  /* 坐席类型 */
  const [localCheckedTicketTypes, localCheckedTicketTypesDispatch] = useReducer(
    checkedReducer,
    checkedTicketTypes,
    (checkedTicketTypes) => ({ ...checkedTicketTypes })
  );
  /* 列车类型 */
  const [localCheckedTrainType, localCheckedTrainTypeDispatch] = useReducer(
    checkedReducer,
    checkedTrainTypes,
    (checkedTrainTypes) => ({
      ...checkedTrainTypes,
    })
  );
  /* 出发车站 */
  const [localCheckedDepartStations, localCheckedDepartStationsDispatch] =
    useReducer(
      checkedReducer,
      checkedDepartStations,
      (checkedDepartStations) => ({ ...checkedDepartStations })
    );
  /* 到达车站 */
  const [localCheckedArriveStation, localCheckedArriveStationDispatch] =
    useReducer(
      checkedReducer,
      checkedArriveStations,
      (checkedArriveStations) => ({ ...checkedArriveStations })
    );

  const [localDepartTimeStart, setLocalDepartTimeStart] =
    useState(departTimeStart);
  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
  const [localArriveTimeStart, setLocalArriveTimeStart] =
    useState(arriveTimeStart);
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);
  const optionGroup = [
    {
      title: "坐席类型",
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      dispatch: localCheckedTicketTypesDispatch,
    },
    {
      title: "列车类型",
      options: trainTypes,
      checkedMap: localCheckedTrainType,
      dispatch: localCheckedTrainTypeDispatch,
    },
    {
      title: "出发车站",
      options: departStations,
      checkedMap: localCheckedDepartStations,
      dispatch: localCheckedDepartStationsDispatch,
    },
    {
      title: "到达车站",
      options: arriveStations,
      checkedMap: localCheckedArriveStation,
      dispatch: localCheckedArriveStationDispatch,
    },
  ];
  /* 判断是否有option被选中 */
  const isDisabled = useMemo(() => {
    return (
      Object.keys(localCheckedTicketTypes).length === 0 &&
      Object.keys(localCheckedTrainType).length === 0 &&
      Object.keys(localCheckedDepartStations).length === 0 &&
      Object.keys(localCheckedArriveStation).length === 0 &&
      localDepartTimeStart === 0 &&
      localArriveTimeStart === 0 &&
      localArriveTimeEnd === 24 &&
      localDepartTimeEnd === 24
    );
  }, [
    localCheckedTicketTypes,
    localCheckedTrainType,
    localCheckedDepartStations,
    localCheckedArriveStation,
    localDepartTimeStart,
    localArriveTimeStart,
    localArriveTimeEnd,
    localDepartTimeEnd,
  ]);

  /* 重置按钮，重置所有local属性 */
  const reset = () => {
    if (isDisabled) return;
    localCheckedTicketTypesDispatch({ type: "reset" });
    localCheckedTrainTypeDispatch({ type: "reset" });
    localCheckedDepartStationsDispatch({ type: "reset" });
    localCheckedArriveStationDispatch({ type: "reset" });
    setLocalDepartTimeStart(0);
    setLocalDepartTimeEnd(24);
    setLocalArriveTimeStart(0);
    setLocalArriveTimeEnd(24);
  };
  /* 提交按钮 */
  const confirm = () => {
    setCheckedTicketTypes(localCheckedTicketTypes);
    setCheckedTrainTypes(localCheckedTrainType);
    setCheckedDepartStations(localCheckedDepartStations);
    setCheckedArriveStations(localCheckedArriveStation);
    setDepartTimeStart(localDepartTimeStart);
    setDepartTimeEnd(localDepartTimeEnd);
    setArriveTimeStart(localArriveTimeStart);
    setArriveTimeEnd(localArriveTimeEnd);

    toggleIsFiltersVisible();
  };

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span
              className={classnames("reset", { disabled: isDisabled })}
              onClick={() => {
                reset();
              }}
            >
              重置
            </span>
            <span
              className="ok"
              onClick={() => {
                confirm();
              }}
            >
              确认
            </span>
          </div>
          <div className="options">
            {optionGroup.map((options) => {
              return <Options key={nanoid()} {...options} />;
            })}
            <Slider
              title="出发时间"
              currentStartHours={localDepartTimeStart}
              currentEndHours={localDepartTimeEnd}
              onStartChanged={setLocalDepartTimeStart}
              onEndChanged={setLocalDepartTimeEnd}
            />
            <Slider
              title="到达时间"
              currentStartHours={localArriveTimeStart}
              currentEndHours={localArriveTimeEnd}
              onStartChanged={setLocalArriveTimeStart}
              onEndChanged={setLocalArriveTimeEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

BottomModal.propTypes = {
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired,
};

export default function Bottom(props) {
  const {
    orderType,
    highSpeed,
    onlyTickets,
    isFilterVisible,
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
  } = props;

  /* 检查option中是否有选中内容 */
  const noChecked = useMemo(() => {
    return (
      Object.keys(checkedTicketTypes).length === 0 &&
      Object.keys(checkedTrainTypes).length === 0 &&
      Object.keys(checkedDepartStations).length === 0 &&
      Object.keys(checkedArriveStations).length === 0 &&
      departTimeStart === 0 &&
      arriveTimeStart === 0 &&
      arriveTimeEnd === 24 &&
      departTimeEnd === 24
    );
  }, [
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    arriveTimeStart,
    arriveTimeEnd,
    departTimeEnd,
  ]);

  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className="item" onClick={toggleOrderType}>
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DURATION ? "出发 早→晚" : "耗时 短→长"}
        </span>
        <span
          className={classnames("item", { "item-on": highSpeed })}
          onClick={toggleHighSpeed}
        >
          <i className="icon">{highSpeed ? "\uf43f" : "\uf43e"}</i>
          只看高铁动车
        </span>
        <span
          className={classnames("item", { "item-on": onlyTickets })}
          onClick={toggleOnlyTickets}
        >
          <i className="icon">{onlyTickets ? "\uf43d" : "\uf43c"}</i>
          只看有票
        </span>
        <span
          className={classnames("item", {
            "item-on": isFilterVisible || !noChecked,
          })}
          onClick={toggleIsFiltersVisible}
        >
          <i className="icon">{noChecked ? "\uf0f7" : "\uf446"}</i>
          综合筛选
        </span>
      </div>
      {isFilterVisible && (
        <BottomModal
          ticketTypes={ticketTypes}
          trainTypes={trainTypes}
          departStations={departStations}
          arriveStations={arriveStations}
          checkedTicketTypes={checkedTicketTypes}
          checkedTrainTypes={checkedTrainTypes}
          checkedDepartStations={checkedDepartStations}
          checkedArriveStations={checkedArriveStations}
          departTimeStart={departTimeStart}
          departTimeEnd={departTimeEnd}
          arriveTimeStart={arriveTimeStart}
          arriveTimeEnd={arriveTimeEnd}
          setCheckedTicketTypes={setCheckedTicketTypes}
          setCheckedTrainTypes={setCheckedTrainTypes}
          setCheckedDepartStations={setCheckedDepartStations}
          setCheckedArriveStations={setCheckedArriveStations}
          setDepartTimeStart={setDepartTimeStart}
          setDepartTimeEnd={setDepartTimeEnd}
          setArriveTimeStart={setArriveTimeStart}
          setArriveTimeEnd={setArriveTimeEnd}
          toggleIsFiltersVisible={toggleIsFiltersVisible}
        />
      )}
    </div>
  );
}

Bottom.propTypes = {
  orderType: PropTypes.number.isRequired,
  highSpeed: PropTypes.bool.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  isFilterVisible: PropTypes.bool.isRequired,
  toggleOrderType: PropTypes.func.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired,
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired,
};
