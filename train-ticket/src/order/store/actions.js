export const ACTION_SET_TRAIN_NUMBER = "SET_TRAIN_NUMBER";
export const ACTION_SET_DEPART_STATION = "SET_DEPART_STATION";
export const ACTION_SET_ARRIVE_STATION = "SET_ARRIVE_STATION";
export const ACTION_SET_SEAT_TYPE = "SET_SEAT_TYPE";
export const ACTION_SET_DEPART_DATE = "SET_DEPART_DATE";
export const ACTION_SET_ARRIVE_DATE = "SET_ARRIVE_DATE";
export const ACTION_SET_DEPART_TIME_STR = "SET_DEPART_TIME_STR";
export const ACTION_SET_ARRIVE_TIME_STR = "SET_ARRIVE_TIME_STR";
export const ACTION_SET_DURATION_STR = "SET_DURATION_STR";
export const ACTION_SET_PRICE = "SET_PRICE";
export const ACTION_SET_PASSENGERS = "SET_PASSENGERS";
export const ACTION_SET_MENU = "SET_MENU";
export const ACTION_SET_IS_MENU_VISIBLE = "SET_IS_MENU_VISIBLE";
export const ACTION_SET_SEARCH_PARSED = "SET_SEARCH_PARSED";

export function setTrainNumber(trainNumber) {
  return {
    type: ACTION_SET_TRAIN_NUMBER,
    payload: trainNumber,
  };
}
export function setDepartStation(departStation) {
  return {
    type: ACTION_SET_DEPART_STATION,
    payload: departStation,
  };
}
export function setArriveStation(arriveStation) {
  return {
    type: ACTION_SET_ARRIVE_STATION,
    payload: arriveStation,
  };
}
export function setSeatType(seatType) {
  return {
    type: ACTION_SET_SEAT_TYPE,
    payload: seatType,
  };
}
export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate,
  };
}
export function setArriveDate(arriveDate) {
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload: arriveDate,
  };
}
export function setDepartTimeStr(departTimeStr) {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload: departTimeStr,
  };
}
export function setArriveTimeStr(arriveTimeStr) {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload: arriveTimeStr,
  };
}
export function setDurationStr(durationStr) {
  return {
    type: ACTION_SET_DURATION_STR,
    payload: durationStr,
  };
}
export function setPrice(price) {
  return {
    type: ACTION_SET_PRICE,
    payload: price,
  };
}
export function setPassengers(passengers) {
  return {
    type: ACTION_SET_PASSENGERS,
    payload: passengers,
  };
}
export function setMenu(menu) {
  return {
    type: ACTION_SET_MENU,
    payload: menu,
  };
}
export function setIsMenuVisible(isMenuVisible) {
  return {
    type: ACTION_SET_IS_MENU_VISIBLE,
    payload: isMenuVisible,
  };
}
export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed,
  };
}

export function showMenu(menu) {
  return (dispatch) => {
    dispatch(setMenu(menu));
    dispatch(setIsMenuVisible(true));
  };
}

export function hideMenu() {
  return setIsMenuVisible(false);
}

export function fetchInitial(url) {
  return (dispatch, getState) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const { departTimeStr, arriveTimeStr, arriveDate, durationStr, price } =
          data;
        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setPrice(price));
      });
  };
}

/* 创建成人信息 */
let passengersId = 0;
export function createAdult() {
  return (dispatch, getState) => {
    const { passengers } = getState();

    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key]) {
          return;
        }
      }
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengersId,
          name: "",
          ticketType: "adult",
          licenceId: "",
          seat: "Z",
        },
      ])
    );
  };
}

/* 创建儿童信息 */
export function createChild() {
  return (dispatch, getState) => {
    const { passengers } = getState();
    let followAdult = null;
    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key]) {
          return;
        }
      }
      if (passenger.ticketType === "adult") {
        followAdult = passenger.id;
      }
    }
    if (!followAdult) {
      alert("需添加一个成人😤");
      return;
    }
    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengersId,
          name: "",
          gender: "",
          birthday: "",
          followAdult: followAdult,
          ticketType: "child",
          seat: "Z",
        },
      ])
    );
  };
}

/* 删除信息 */
export function onRemove(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const newArray = passengers.filter((passenger) => {
      return id !== passenger.id && id !== passenger.followAdult;
    });
    dispatch(setPassengers(newArray));
  };
}

/* 更新乘客信息 */
/* export function updatePassenger(id, data) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const newArray = passengers.map((passenger) => {
      return id === passenger.id ? { ...passenger, data } : passenger;
    });
    dispatch(setPassengers(newArray));
  };
} */
export function updatePassenger(id, data) {
  return (dispatch, getState) => {
    const { passengers } = getState()

    for (let i = 0; i < passengers.length; ++i) {
      if (passengers[i].id === id) {
        const newPassengers = [...passengers]
        newPassengers[i] = Object.assign({}, passengers[i], data)

        dispatch(setPassengers(newPassengers))

        break
      }
    }
  }
}
