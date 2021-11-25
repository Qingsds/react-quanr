import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from "./reducers";
import thunk from "redux-thunk";

export default createStore(
  combineReducers(reducers),
  {
    from: "北京",
    to: "上海",
    // 城市选择浮层的开关
    isCitySelectorVisible: false,
    currentSelectingLeftCity: false,
    // 城市数据
    cityData: null,
    // 是否在加载城市数据
    isLoadingCityData: false,
    // 日期选择浮层的开关
    isDateSelectorVisible: false,
    // 是否选择了高铁动车
    highSpeed: false,
    // 
    departDate:Date.now(),
  },
  composeWithDevTools(applyMiddleware(thunk))
);
