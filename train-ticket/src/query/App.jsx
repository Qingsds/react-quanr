import React, { useCallback, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import URI from "urijs";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";

import { h0 } from "../common/fp";
import Header from "../common/Header.jsx";
import Nav from "../common/Nav.jsx";
import List from "./List.jsx";
import Bottom from "./Bottom.jsx";
import useNav from "../common/useNav";

import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,
  prevDate,
  nextDate,
  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible,
  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd,
} from "./actions";

import "./App.css";

function App(props) {
  return (
    <div>
        <Nav />
        <List />
        <Bottom  />
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
