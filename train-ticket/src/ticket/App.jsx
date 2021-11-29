import React, { useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import URI from "urijs";
import dayjs from "dayjs";
import { h0 } from "../common/fp";
import Header from "../common/Header";
import Nav from "../common/Nav";
import useNav from "../common/useNav";
import Detail from "../common/Detail";
import Candidate from "./Candidate";
import Schedule from "./Schedule";
import "./App.css";
import {
  setDepartDate,
  setArriveDate,
  setDepartTimeStr,
  setArriveTimeStr,
  setArriveStation,
  setTrainNumber,
  setDurationStr,
  setTickets,
  toggleIsScheduleVisible,
  setSearchParsed,
  prevDate,
  nextDate,
  setDepartStation,
} from "./actions";

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    arriveStation,
    departStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch,
  } = props;

  /* 解析url参数 */
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { aStation, dStation, trainNumber, date } = queries;
    dispatch(setArriveStation(aStation));
    dispatch(setDepartStation(dStation));
    dispatch(setTrainNumber(trainNumber));
    /* 将date转换为时间戳 */
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));
    dispatch(setSearchParsed(true));
  }, []);
  /* 发送异步请求获取参数信息 */
  useEffect(() => {
    if (!searchParsed) return;
    const url = new URI("/rest/ticket")
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .setSearch("trainNumber", trainNumber)
      .toString();
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        const { detail, candidates } = result;
        const { departTimeStr, arriveTimeStr, arriveDate, durationStr } =
          detail;
        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setTickets(candidates));
      });
  }, [searchParsed, departDate, trainNumber]);

  /* 将页面标题改为列车号 */
  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);

  /* 获取nav参数 */
  const { isNextDisabled, isPrevDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  );

  /* 设置title的返回函数 */
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  /* detail的回调函数 */
  const detailCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsScheduleVisible,
      },
      dispatch
    );
  }, []);
  /* 设置异步组件 */
  const Schedule = lazy(() => import("./Schedule.jsx"));

  if (!searchParsed) return null;

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title={trainNumber} onBack={onBack} />
      </div>
      <div className="nav-wrapper">
        <Nav
          date={departDate}
          prev={prev}
          next={next}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
        />
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
          {...detailCbs}
        />
        {isScheduleVisible && (
          <div
            className="mask"
            onClick={() => {
              dispatch(toggleIsScheduleVisible());
            }}
          >
            {/* 异步组件必须由 Suspense 包裹 */}
            <Suspense fallback={<div>loading</div>}>
              <Schedule
                date={departDate}
                trainNumber={trainNumber}
                departStation={departStation}
                arriveStation={arriveStation}
              />
            </Suspense>
          </div>
        )}
      </div>
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
