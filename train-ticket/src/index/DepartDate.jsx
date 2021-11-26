import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { h0 } from "../common/fp";
import dayjs from "dayjs";
import "./DepartDate.css";

export default function DepartDate(props) {
  const { onClick, time } = props;
  /* 此函数用来去除时间戳的时分秒，这样一来，h0ofDepart不会时刻的变化，减少渲染次数 */
  const h0ofDepart = h0(time);
  const departDateString = useMemo(() => {
    return dayjs(h0ofDepart).format("YYYY-MM-DD");
  }, [h0ofDepart]);
  /* 将时间戳转换为日期对象 */
  const departDate = new Date(h0ofDepart);
  /* 判断选中日期是否是当日日期 */
  const isToday = h0ofDepart === h0();
  const weekString = `周${
    ["日", "一", "二", "三", "四", "五", "六"][departDate.getDay()]
  }${isToday ? "(今天)" : ""}`;
  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateString} />
      {departDateString}
      <span className="depart-week">{weekString}</span>
    </div>
  );
}
DepartDate.prototype = {
  onClick: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};
