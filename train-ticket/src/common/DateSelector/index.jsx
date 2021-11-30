import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import { h0 } from "../fp";
import Header from "../Header";

import "./index.css";
import { nanoid } from "nanoid";

/* 天 */
function Day(props) {
  const { day, onSelect } = props;
  if(!day){
      return <td className="null"></td>
  }
  let classes = [];
  /* 包含周六周日则加入weekend类 */
  if([6,0].includes(new Date(day).getDay)){
      classes.push('weekend')
  }
  const now = h0();
  /* 如果是过去的时间则加入disabled */
  if(day < now) {
      classes.push('disabled')
  }
  const dateString = day === now ? '今天':new Date(day).getDate();
  return(
      <td className={classnames(classes)} onClick={() => onSelect(day)}>
          {dateString}
      </td>
  )
}
Day.prototype = {
  day: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

/* 周 */
function Week(props) {
  const { days, onSelect } = props;
  return (
    <tr className="date-table-days">
      {days.map((day) => {
        return <Day key={nanoid()} day={day} onSelect={onSelect} />;
      })}
    </tr>
  );
}
Week.prototype = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

/* 月 */
function Month(props) {
  const { startingTimeInMonth, onSelect } = props;
  /* 当前月的第一天 */
  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);
  /* 用来记录当前月的天数 */
  let days = [];
  /* 此循环用来记录天数 */
  while (currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }
  /* 
  每月第一天前面的星期置空 注意周末是0 
  如果月初是周末需要置空6天，其余是置空所在的星期-1
  */
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
    .fill(null)
    .concat(days);
  /* 
  每个月的最后一天 后面的星期置空
  如果月末是周末则指空天数为0，否则为7-星期
  */
  const lastDay = new Date(days[days.length - 1]);
  days = days.concat(
    new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
  );
  let weeks = [];
  for (let row = 0; row < days.length / 7; row++) {
    const week = days.slice(row * 7 ,(row + 1) * 7);
    weeks.push(week);
  }
  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>
              {/* 这里month从0开始，所以要+1 */}
              {startDay.getFullYear()}年{startDay.getMonth() + 1}月
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="date-table-weeks">
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
          <th className="weekend">周日</th>
        </tr>
        {weeks.map((week) => {
          return <Week key={nanoid()} days={week} onSelect={onSelect} />;
        })}
      </tbody>
    </table>
  );
}
Month.prototype = {
  startingTimeInMonth: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

/* 日期浮层组件 */
export default function DateSelector(props) {
  const { show, onBack, onSelect } = props;
  /* 获取当前时间并将当前时间设置成这个月的第一天 */
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1);
  /* montSequence存入未来三个月的时间 */
  const montSequence = [now.getTime()];
  now.setMonth(now.getMonth() + 1);
  montSequence.push(now.getTime());
  now.setMonth(now.getMonth() + 1);
  montSequence.push(now.getTime());

  return (
    <div className={classnames("date-selector", { hidden: !show })}>
      <Header title="日期选择" onBack={onBack} />
      <div className="date-selector-tables">
        {montSequence.map((month) => {
          return (
            <Month
              key={nanoid()}
              startingTimeInMonth={month}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
}
DateSelector.prototype = {
  show: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
