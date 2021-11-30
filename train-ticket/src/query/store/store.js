import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

import { h0 } from '../../common/fp';
import { ORDER_DEPART } from './constant';

export default createStore(
    combineReducers(reducers),
    {
        from:null,
        to:null,
        departDate:h0(Date.now()),
        /* 只看高铁动车 */
        highSpeed: false,
        trainList:[],
        /* 列表的排序类型，触发早到晚和耗时短到长*/
        orderType:ORDER_DEPART,
        /* 筛选项只看有票 */
        onlyTickets:false,
        /*  坐席类型 */
        ticketTypes:[],
        checkedTicketTypes:{},
        /* 车次类型 */
        trainTypes:[],
        checkedTrainTypes:{},
        /* 出发车站 */
        departStations:[],
        checkedDepartStations:{},
        /* 到达车站 */
        arriveStations:[],
        checkedArriveStations:{},
        /* 出发时间 */
        departTimeStart:0,
        departTimeEnd:24,
        /* 到达时间 */
        arriveTimeStart:0,
        arriveTimeEnd:24,
        /* 是否加载总和筛选浮层 */
        isFilterVisible:false,
        /* 是否解析完成传入信息 */
        searchParsed:false,

    },
    applyMiddleware(thunk)
);
