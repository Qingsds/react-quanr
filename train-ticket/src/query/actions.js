import { ORDER_DURATION, ORDER_DEPART } from "./constant";
import { h0 } from "../common/fp";

export const ACTION_SET_FROM = "SET_FROM";
export const ACTION_SET_TO = "SET_TO";
export const ACTION_SET_DEPART_DATE = "SET_DEPART_DATE";
export const ACTION_SET_HIGH_SPEED = "SET_HIGH_SPEED";
export const ACTION_SET_TRAIN_LIST = "SET_TRAIN_LIST";
export const ACTION_SET_ORDER_TYPE = "SET_ORDER_TYPE";
export const ACTION_SET_ONLY_TICKETS = "SET_ONLY_TICKETS";
export const ACTION_SET_TICKET_TYPES = "SET_TICKET_TYPES";
export const ACTION_SET_CHECKED_TICKET_TYPES = "SET_CHECKED_TICKET_TYPES";
export const ACTION_SET_TRAIN_TYPES = "SET_TRAIN_TYPES";
export const ACTION_SET_CHECKED_TRAIN_TYPES = "SET_CHECKED_TRAIN_TYPES";
export const ACTION_SET_DEPART_STATIONS = "SET_DEPART_STATIONS";
export const ACTION_SET_CHECKED_DEPART_STATIONS = "SET_CHECKED_DEPART_STATIONS";
export const ACTION_SET_ARRIVE_STATIONS = "SET_ARRIVE_STATIONS";
export const ACTION_SET_CHECKED_ARRIVE_STATIONS = "SET_CHECKED_ARRIVE_STATIONS";
export const ACTION_SET_DEPART_TIME_START = "SET_DEPART_TIME_START";
export const ACTION_SET_DEPART_TIME_END = "SET_DEPART_TIME_END";
export const ACTION_SET_ARRIVE_TIME_START = "SET_ARRIVE_TIME_START";
export const ACTION_SET_ARRIVE_TIME_END = "SET_ARRIVE_TIME_END";
export const ACTION_SET_IS_FILTERS_VISIBLE = "SET_IS_FILTERS_VISIBLE";
export const ACTION_SET_SEARCH_PARSED = "SET_SEARCH_PARSED";

export const setFrom = (payload) => {
  return {
    type: ACTION_SET_FROM,
    payload,
  };
};
export const setTo = (payload) => {
  return {
    type: ACTION_SET_TO,
    payload,
  };
};
export const setDepartDate = (payload) => {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload,
  };
};
export const setHighSpeed = (payload) => {
  return {
    type: ACTION_SET_HIGH_SPEED,
    payload,
  };
};
export const setSearchParsed = (payload) => {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload,
  };
};
export const setTrainList = (payload) => {
  return {
    type: ACTION_SET_TRAIN_LIST,
    payload,
  };
};
export const setTicketTypes = (payload) => {
  return {
    type: ACTION_SET_TICKET_TYPES,
    payload,
  };
};
export const setTrainTypes = (payload) => {
  return {
    type: ACTION_SET_TRAIN_TYPES,
    payload,
  };
};
export const setDepartStations = (payload) => {
  return {
    type: ACTION_SET_DEPART_STATIONS,
    payload,
  };
};
export const setArriveStations = (payload) => {
  return {
    type: ACTION_SET_ARRIVE_STATIONS,
    payload,
  };
};
/* 86400 * 1000是一天的 */
export const prevDate = () => {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
  };
};
export const nextDate = () => {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
  };
};
export const toggleOrderType = () => {
  return (dispatch, getState) => {
    const { orderType } = getState();
    if (orderType === ORDER_DEPART) {
      dispatch({
        type: ACTION_SET_ORDER_TYPE,
        payload: ORDER_DURATION,
      });
    } else {
      dispatch({
        type: ACTION_SET_ORDER_TYPE,
        payload: ORDER_DEPART,
      });
    }
  };
};
export const toggleHighSpeed = () => {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed,
    });
  };
};
export const toggleOnlyTickets = () => {
  return (dispatch, getState) => {
    const { onlyTickets } = getState();
    dispatch({
      type: ACTION_SET_ONLY_TICKETS,
      payload: !onlyTickets,
    });
  };
};
export const toggleIsFiltersVisible = () => {
  return (dispatch, getState) => {
    const { isFilterVisible } = getState();
    dispatch({
      type: ACTION_SET_IS_FILTERS_VISIBLE,
      payload: !isFilterVisible,
    });
  };
};
export const setCheckedTicketTypes = (payload) => {
  return {
    type: ACTION_SET_CHECKED_TICKET_TYPES,
    payload,
  };
};
export const setCheckedTrainTypes = (payload) => {
  return {
    type: ACTION_SET_CHECKED_TRAIN_TYPES,
    payload,
  };
};
export const setCheckedDepartStations = (payload) => {
  return {
    type: ACTION_SET_CHECKED_DEPART_STATIONS,
    payload,
  };
};
export const setCheckedArriveStations = (payload) => {
  return {
    type: ACTION_SET_CHECKED_ARRIVE_STATIONS,
    payload,
  };
};
export const setDepartTimeStart = (payload) => {
  return {
    type: ACTION_SET_DEPART_TIME_START,
    payload,
  };
};
export const setDepartTimeEnd = (payload) => {
  return {
    type: ACTION_SET_DEPART_TIME_END,
    payload,
  };
};
export const setArriveTimeStart = (payload) => {
  return {
    type: ACTION_SET_ARRIVE_TIME_START,
    payload,
  };
};
export const setArriveTimeEnd = (payload) => {
  return {
    type: ACTION_SET_ARRIVE_TIME_END,
    payload,
  };
};
