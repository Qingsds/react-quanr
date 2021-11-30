export const ACTION_SET_FROM = "SET_FROM";
export const ACTION_SET_TO = "SET_TO";
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE =
  "SET_IS_CITY_SELECTOR_VISIBLE";
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY =
  "SET_CURRENT_SELECTING_LEFT_CITY";
export const ACTION_SET_CITY_DATA = "SET_CITY_DATA";
export const ACTION_SET_IS_LOADING_CITY_DATA = "SET_IS_LOADING_CITY_DATA";
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE =
  "SET_IS_DATE_SELECTOR_VISIBLE";
export const ACTION_SET_HIGH_SPEED = "SET_HIGH_SPEED";
export const ACTION_SET_DEPART_DATE = "SET_DEPART_DATE";

export const setFrom = (from) => ({ type: ACTION_SET_FROM, payload: from });

export const setTo = (to) => ({ type: ACTION_SET_TO, payload: to });

export const setIsLoadingCityData = (isLoadingCityData) => ({
  type: ACTION_SET_IS_LOADING_CITY_DATA,
  payload: isLoadingCityData,
});

export const setCityData = (cityData) => ({
  type: ACTION_SET_CITY_DATA,
  payload: cityData,
});

export const toggleHighSpeed = () => {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed,
    });
  };
};

export const showCitySelector = (currentSelectingLeftCity) => {
  return (dispatch) => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true,
    });
    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity,
    });
  };
};

export const hideCitySelector = () => ({
  type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  payload: false,
});

export const setSelectedCity = (city) => {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState();
    if (currentSelectingLeftCity) {
      dispatch(setFrom(city));
    } else {
      dispatch(setTo(city));
    }
    // 修改完毕后隐藏城市浮层
    dispatch(hideCitySelector());
  };
};

export const showDateSelector = () => ({
  type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  payload: true,
});

export const hideDateSelector = () => ({
  type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  payload: false,
});

export const exchangeFromTo = () => {
  return (dispatch, getState) => {
    const { from, to } = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
};
/* 更改departDate日期 */
export const setDepartDate = (date) => ({
  type: ACTION_SET_DEPART_DATE,
  payload: date,
});

export const fetchCityData = () => {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState();
    // 判断isLoadingCityData的状态,为true直接返回
    if (isLoadingCityData) return;
    // 抓取localStorage的本地数据，如果有，直接返回
    const cache = JSON.parse(localStorage.getItem("local_city_data") || "{}");
    if (Date.now() < cache.expires) {
      dispatch(setCityData(cache.data));
      return;
    }
    //修改状态为加载中
    setIsLoadingCityData(true);
    fetch(`/rest/cities?_${Date.now()}`)
      .then((res) => res.json())
      .then((cityData) => {
        dispatch(setCityData(cityData));
        dispatch(setIsLoadingCityData(false));
        localStorage.setItem(
          "local_city_data",
          JSON.stringify({
            expires: Date.now() + 60 * 1000,
            data: cityData,
          })
        );
      })
      .catch((err) => {
        dispatch(setIsLoadingCityData(false));
        throw err;
      });
  };
};
