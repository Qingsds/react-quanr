import React, { useCallback, useMemo } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./App.css";

import Header from "../common/Header.jsx";
import DepartDate from "./DepartDate.jsx";
import HighSpeed from "./HighSpeed.jsx";
import Journey from "./Journey.jsx";
import Submit from "./Submit.jsx";

import CitySelector from "../common/CitySelector.jsx";
import DateSelector from "../common/DateSelector.jsx";

import { h0 } from "../common/fp";

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed,
} from "./actions";

function App(props) {
  const {
    from,
    to,
    dispatch,
    cityData,
    isLoadingCityData,
    isCitySelectorVisible,
  } = props;
  //header返回按钮方法
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  //citySelector 返回按钮
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector, //隐藏城市浮层
        fetchCityData,//发送异步请求获取城市数据
        onSelect:setSelectedCity,//点击城市后，更改为选中城市
      },
      dispatch
    );
  }, []);

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo, //切换from to 城市的按钮
        showCitySelector, //是否展示showCitySelector
      },
      dispatch
    );
  }, []);
  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form className="form">
        <Journey from={from} to={to} {...cbs} />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoadingCityData={isLoadingCityData}
        {...citySelectorCbs}
      />
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
