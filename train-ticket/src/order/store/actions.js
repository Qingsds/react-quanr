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

/* ?????????????????? */
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

/* ?????????????????? */
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
      alert("?????????????????????????");
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

/* ???????????? */
export function onRemove(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const newArray = passengers.filter((passenger) => {
      return id !== passenger.id && id !== passenger.followAdult;
    });
    dispatch(setPassengers(newArray));
  };
}

/* ?????????????????? */
/* export function updatePassenger(id, data, removeKeyMap) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const newArray = passengers.map((passenger) => {
      const updatePassenger =
        id === passenger.id ? Object.assign({}, passenger, data) : passenger;
      for (let key of removeKeyMap) {
        delete updatePassenger[key];
      }

    });
    dispatch(setPassengers(newArray));
  };
} */
export function updatePassenger(id, data, removeKeyMap = []) {
  return (dispatch, getState) => {
    const { passengers } = getState();

    for (let i = 0; i < passengers.length; ++i) {
      if (passengers[i].id === id) {
        const newPassengers = [...passengers];
        newPassengers[i] = Object.assign({}, passengers[i], data);
        for (let key of removeKeyMap) {
          delete newPassengers[i][key];
        }
        dispatch(setPassengers(newPassengers));
        break;
      }
    }
  };
}

export function showMenu(menu) {
  return (dispatch) => {
    dispatch(setMenu(menu));
    dispatch(setIsMenuVisible(true));
  };
}

/* ?????????????????? */
export function showGenderMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const passenger = passengers.find((passenger) => id === passenger.id);
    if (!passenger) return;
    dispatch(
      showMenu({
        onPress(gender) {
          /* ???????????? */
          dispatch(updatePassenger(id, { gender }));
          /* ???????????? */
          dispatch(hideMenu());
        },
        /* ???????????? */
        options: [
          {
            title: "???",
            value: "male",
            active: passenger.gender === "male",
          },
          {
            title: "???",
            value: "female",
            active: passenger.gender === "female",
          },
        ],
      })
    );
  };
}

/* ?????????????????? */
export function showFollowAdult(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const passenger = passengers.find((passenger) => id === passenger.id);
    if (!passenger) return;
    dispatch(
      showMenu({
        onPress(followAdult) {
          dispatch(updatePassenger(id, { followAdult }));
          dispatch(hideMenu());
        },
        options: passengers
          .filter((passenger) => passenger.ticketType === "adult")
          .map((adult) => {
            return {
              title: adult.name,
              value: adult.id,
              active: adult.id === passenger.followAdult,
            };
          }),
      })
    );
  };
}

/* ?????????????????? */
export function showTicketType(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const passenger = passengers.find((passenger) => id === passenger.id);
    if (!passenger) return;
    dispatch(
      showMenu({
        onPress(ticketType) {
          /* ??????????????? */
          if (ticketType === "adult") {
            dispatch(
              updatePassenger(
                id,
                {
                  ticketType: "adult",
                  licenceId: "",
                },
                ["gender", "birthday", "followAdult"]
              )
            );
          } else {
            /* ??????????????? */
            const adult = passengers.find(
              (passenger) =>
                passenger.id !== id && passenger.ticketType === "adult"
            );
            if (adult) {
              dispatch(
                updatePassenger(
                  id,
                  {
                    ticketType: "child",
                    gender: "",
                    birthday: "",
                    followAdult: "",
                  },
                  ["licenceId"]
                )
              );
            } else {
              alert("???????????????????????????????");
              return;
            }
          }
          dispatch(hideMenu());
        },
        options: [
          {
            title: "?????????",
            value: "adult",
            active: passenger.ticketType === "adult",
          },
          {
            title: "?????????",
            value: "child",
            active: passenger.ticketType === "child",
          },
        ],
      })
    );
  };
}

/* ???????????? */
export function hideMenu() {
  return setIsMenuVisible(false);
}
