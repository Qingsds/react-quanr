import React, { useMemo } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "./index.css";

function format(d) {
  const time = dayjs(d);

  return time.format(`MM-DD ${time.locale("zh-cn").format("ddd")}`);
}

export default function Detail(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    arriveStation,
    departStation,
    trainNumber,
    durationStr,
    children,
  } = props;

  const depart = useMemo(() => format(departDate), [departDate]);
  const arrive = useMemo(() => format(arriveDate), [arriveDate]);

  return (
    <div className="detail">
      <div className="content">
        <div className="left">
          <p className="city">{departStation}</p>
          <p className="time">{departTimeStr}</p>
          <p className="date">{depart}</p>
        </div>
        <div className="middle">
          <p className="train-name">{trainNumber}</p>
            {
              children
            }
          <p className="train-time">耗时 {durationStr}</p>
        </div>
        <div className="right">
          <p className="city">{arriveStation}</p>
          <p className="time">{arriveTimeStr}</p>
          <p className="date">{arrive}</p>
        </div>
      </div>
    </div>
  );
}
Detail.propTypes = {
  departDate: PropTypes.number.isRequired,
  arriveDate: PropTypes.number.isRequired,
  departTimeStr: PropTypes.string,
  arriveTimeStr: PropTypes.string,
  arriveStation: PropTypes.string.isRequired,
  departStation: PropTypes.string.isRequired,
  trainNumber: PropTypes.string.isRequired,
  durationStr: PropTypes.string,
};
