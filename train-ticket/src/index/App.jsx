import React, { useCallback, useMemo } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./App.css";

import Header from "../common/Header";
import DepartDate from "./DepartDate";
import HighSpeed from "./HighSpeed";
import Journey from "./Journey";
import Submit from "./Submit";

import CitySelector from "../common/CitySelector";
import DateSelector from "../common/DateSelector";

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
} from "./store/actions";

function App(props) {
  const {
    from,
    to,
    dispatch,
    cityData,
    highSpeed,
    departDate,
    isLoadingCityData,
    isDateSelectorVisible,
    isCitySelectorVisible,
  } = props;

  //header返回按钮方法
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  /* departDate组件 */
  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector,
      },
      dispatch
    );
  });

  /* highSpeed组件 */
  const highSpeedCbs = useMemo(() =>{
    return bindActionCreators({
      toggle:toggleHighSpeed
    },dispatch)
  })

  //citySelector 组件
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector, //隐藏城市浮层
        fetchCityData, //发送异步请求获取城市数据
        onSelect: setSelectedCity, //点击城市后，更改为选中城市
      },
      dispatch
    );
  }, []);

  /* dateSelector 组件 */
  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector,
      },
      dispatch
    );
  });

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo, //切换from to 城市的按钮
        showCitySelector, //是否展示showCitySelector
      },
      dispatch
    );
  }, []);
  const onSelectDate = (day) => {
    if(!day || day < h0()) return
    dispatch(setDepartDate(day));
    dispatch(hideDateSelector());
  }
  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form action="./query.html" className="form">
        <Journey from={from} to={to} {...cbs} />
        <DepartDate time={departDate} {...departDateCbs} />
        <HighSpeed highSpeed={highSpeed} {...highSpeedCbs}/>
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoadingCityData={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector 
        show={isDateSelectorVisible} 
        onSelect={onSelectDate} 
        {...dateSelectorCbs}
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
