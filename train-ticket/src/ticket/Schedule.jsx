import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import URI from "urijs";
import leftPad from "left-pad";
import classnames from "classnames";

import "./Schedule.css";
import dayjs from "dayjs";

const ScheduleRow = memo(function ScheduleRow(props) {
  const {
    index,
    station,
    arriveTime,
    departTime,
    stay,

    isStartStation,
    isEndStation,
    isDepartStation,
    isArriveStation,
    beforeDepartStation,
    afterArriveStation,
  } = props;

  return (
    <li>
      {/* 首列图标 */}
      <div
        className={classnames("icon", {
          "icon-red": isDepartStation || isArriveStation,
        })}
      >
        {isDepartStation ? "出" : isArriveStation ? "到" : leftPad(index, 2, 0)}
      </div>
      {/* 行内内容 */}
      <div
        className={classnames("row", {
          grey: beforeDepartStation || afterArriveStation,
        })}
      >
        {/* 车站 */}
        <span
          className={classnames("station", {
            red: isArriveStation || isDepartStation,
          })}
        >
          {station}
        </span>
        {/* 到达时间 */}
        <span className={classnames("arrtime", { red: isArriveStation })}>
          {isStartStation ? "始发站" : arriveTime}
        </span>
        {/* 发车时间 */}
        <span className={classnames("deptime", { red: isDepartStation })}>
          {isEndStation ? "终到站" : departTime}
        </span>
        {/* 停留时间 */}
        <span className="stoptime">
          {isStartStation || isEndStation ? "-" : stay + "分"}
        </span>
      </div>
    </li>
  );
});

const Schedule = memo(function Schedule(props) {
  const { date, trainNumber, departStation, arriveStation } = props;
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    const url = new URI("rest/schedule")
      .setSearch("date", dayjs(date).format("YYYY-MM-DD"))
      .setSearch("trainNumber", trainNumber)
      .setSearch("departStation", departStation)
      .setSearch("arriveStation", arriveStation)
      .toString();
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let departRow;
        let arriveRow;
        for (let i = 0; i < data.length; ++i) {
          /*
             思路：
             开始循环-->判断是否有始发站(没有)
                没有出发站从第一个开始判断是否跟departStation一致,
                        -->
                        一致就是出发站，如果不是就是在出发站前
                再判断是否是有到达站-->(没有)
                        一致就是到达站，如果不是就是在到达站之后
                始发站到达站都有 -->
                        那就是中间部分都设置为false
                    
            */
          if (!departRow) {
            if (data[i].station.indexOf(`${departStation}`) !== -1) {
              departRow = Object.assign(data[i], {
                isDepartStation: true,
                isArriveStation: false,
                beforeDepartStation: false,
                afterArriveStation: false,
              });
            } else {
              data[i] = Object.assign(data[i], {
                isDepartStation: false,
                isArriveStation: false,
                beforeDepartStation: true,
                afterArriveStation: false,
              });
            }
          } else if (!arriveRow) {
            if (data[i].station.indexOf(`${arriveStation}`) !== -1) {
              arriveRow = Object.assign(data[i], {
                isDepartStation: false,
                isArriveStation: true,
                beforeDepartStation: false,
                afterArriveStation: false,
              });
            } else {
              data[i] = Object.assign(data[i], {
                isDepartStation: false,
                isArriveStation: false,
                beforeDepartStation: false,
                afterArriveStation: true,
              });
            }
          } else {
            data[i] = Object.assign(data[i], {
              isDepartStation: false,
              isArriveStation: false,
              beforeDepartStation: false,
              afterArriveStation: false,
            });
          }
          data[i] = Object.assign(data[i], {
            isStartStation: i === 0,
            isEndStation: i === data.length - 1,
          });
        }
        setScheduleList(data);
      });
  }, [date, trainNumber, departStation, arriveStation]);
  return (
    <div className="schedule">
      <div className="dialog">
        <h1>列车时刻表</h1>
        <div className="head">
          <span className="station">车站</span>
          <span className="deptime">到达时间</span>
          <span className="arrtime">发车时间</span>
          <span className="stoptime">停留时间</span>
        </div>
        <ul>
          {scheduleList.map((schedule, index) => {
            return (
              <ScheduleRow key={nanoid()} index={index + 1} {...schedule} />
            );
          })}
        </ul>
      </div>
    </div>
  );
});
Schedule.propTypes = {
  date: PropTypes.number.isRequired,
  trainNumber: PropTypes.string.isRequired,
  departStation: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired,
};

export default Schedule;
