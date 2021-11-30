import React, { useCallback, useEffect, useMemo } from "react";
import { bindActionCreators } from "redux";
import URI from "urijs";
import dayjs from "dayjs";
import { connect } from "react-redux";
import Header from "../common/Header";
import Detail from "../common/Detail";
import Ticket from "./Ticket";
import Passengers from "./Passengers";
import "./App.css";
import {
  setArriveStation,
  setDepartStation,
  setTrainNumber,
  setSeatType,
  setDepartDate,
  setSearchParsed,
  fetchInitial,
  createAdult,
  createChild,
  onRemove,
  updatePassenger,
} from "./store/actions";

function App(props) {
  const {
    trainNumber,
    departStation,
    arriveStation,
    seatType,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,
    dispatch,
  } = props;

  /* 接收url携带的参数 */
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { trainNumber, aStation, dStation, type, date } = queries;
    dispatch(setTrainNumber(trainNumber));
    dispatch(setArriveStation(aStation));
    dispatch(setDepartStation(dStation));
    dispatch(setSeatType(type));
    dispatch(setDepartDate(dayjs(date).valueOf()));
    /* 更新解析状态 */
    dispatch(setSearchParsed(true));
  }, []);

  /* 发送异步请求 */
  useEffect(() => {
    if (!searchParsed) return;
    const url = new URI("/rest/order")
      .setSearch("dStation", departStation)
      .setSearch("aStation", arriveStation)
      .setSearch("type", seatType)
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .toString();
    dispatch(fetchInitial(url));
  }, [departStation, arriveStation, seatType, departDate]);

  /* passengers组件回调 */
  const passengersCbs = useMemo(() => {
    return bindActionCreators(
      {
        onRemove,
        createAdult,
        createChild,
        updatePassenger,
      },
      dispatch
    );
  }, []);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  if (!searchParsed) return null;

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title="订票信息" onBack={onBack} />
      </div>
      <div className="detail-wrapper">
        <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          arriveStation={arriveStation}
          departStation={departStation}
          trainNumber={trainNumber}
          durationStr={durationStr}
        >
          <span style={{ display: "block" }} className="train-icon"></span>
        </Detail>
      </div>
      <Ticket type={seatType} price={price} />
      <Passengers passengers={passengers} {...passengersCbs} />
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);
