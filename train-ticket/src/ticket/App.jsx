import React from "react";
import { connect } from "react-redux";
import "./App.css";

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch,
  } = props;
  return (<div>test</div>);
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return {dispatch};
  }
)(App);
