export const ACTION_SET_DEPART_DATE = "ACTION_SET_DEPART_DATE";
export const ACTION_SET_ARRIVE_DATE = "ACTION_SET_ARRIVE_DATE";
export const ACTION_SET_DEPART_TIME_STR = "ACTION_SET_DEPART_TIME_STR";
export const ACTION_SET_ARRIVE_TIME_STR = "ACTION_SET_ARRIVE_TIME_STR";
export const ACTION_SET_ARRIVE_STATION = "ACTION_SET_ARRIVE_STATION";
export const ACTION_SET_TRAIN_NUMBER = "ACTION_SET_TRAIN_NUMBER";
export const ACTION_SET_DURATION_STR = "ACTION_SET_DURATION_STR";
export const ACTION_SET_TICKETS = "ACTION_SET_TICKETS";
export const ACTION_SET_IS_SCHEDULE_VISIBLE = "ACTION_SET_IS_SCHEDULE_VISIBLE";
export const ACTION_SET_SEARCH_PARSED = "ACTION_SET_SEARCH_PARSED";

export function setDepartDate(payload) {
  return { type: ACTION_SET_DEPART_DATE, payload };
}
export function setArriveDate(payload) {
  return { type: ACTION_SET_ARRIVE_DATE, payload };
}
export function setDepartTimeStr(payload) {
  return { type: ACTION_SET_DEPART_TIME_STR, payload };
}
export function setArriveTimeStr(payload) {
  return { type: ACTION_SET_ARRIVE_TIME_STR, payload };
}
export function setArriveStation(payload) {
  return { type: ACTION_SET_ARRIVE_STATION, payload };
}
export function setTrainNumber(payload) {
  return { type: ACTION_SET_TRAIN_NUMBER, payload };
}
export function setDurationStr(payload) {
  return { type: ACTION_SET_DURATION_STR, payload };
}
export function setTickets(payload) {
  return { type: ACTION_SET_TICKETS, payload };
}
export function setIsScheduleVisible(payload) {
  return { type: ACTION_SET_IS_SCHEDULE_VISIBLE, payload };
}
export function toggleIsScheduleVisible() {
    return (dispatch,getState) => {
        const {isScheduleVisible} = getState();
        dispatch(setIsScheduleVisible(!isScheduleVisible))
    }
}
export function setSearchParsed(payload) {
  return { type: ACTION_SET_SEARCH_PARSED, payload };
}
