import React, { memo, useState, useMemo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import leftPad from "left-pad";
import useWinSize from "../common/useWinSize";
import "./Slider.css";

const Slider = memo(function Slider(props) {
  const {
    title,
    currentStartHours,
    currentEndHours,
    onStartChanged,
    onEndChanged,
  } = props;
  /* 获取网页大小 */
  const winSize = useWinSize();
  /* 最左和最右*/
  const startHandle = useRef();
  const endHandle = useRef();
  /* 两个点上一次停止的位置 */
  const lastStartX = useRef();
  const lastEndX = useRef();
  /* 横条和横条的宽度 */
  const range = useRef();
  const rangeWidth = useRef();

  const prevCurrentStartHours = useRef(currentStartHours);
  const prevCurrentEndHours = useRef(currentEndHours);
  /* 
  设置初始的state
  当前的时间÷一天的时间×100获得对应的百分比
  */
  const [start, setStart] = useState(() => (currentStartHours / 24) * 100);
  const [end, setEnd] = useState(() => (currentEndHours / 24) * 100);
  
  if(prevCurrentStartHours.current !== currentStartHours) {
    setStart((currentStartHours / 24) * 100)
    prevCurrentStartHours.current = currentStartHours;
  }
  if(prevCurrentEndHours.current !== currentEndHours) {
    setEnd((currentEndHours / 24) * 100)
    prevCurrentEndHours.current = currentEndHours;
  }


  /* 在组件更新前将start，end设置边界 */
  const startPercent = useMemo(() => {
    if (start > 100) {
      return 100;
    }
    if (start < 0) {
      return 0;
    }
    return start;
  }, [start]);
  const endPercent = useMemo(() => {
    if (end > 100) {
      return 100;
    }
    if (end < 0) {
      return 0;
    }
    return end;
  }, [end]);
  /* 两个点所在的时间 */
  const startHours = useMemo(() => {
    return Math.round((startPercent * 24) / 100);
  }, [startPercent]);
  const endHours = useMemo(() => {
    return Math.round((endPercent * 24) / 100);
  }, [endPercent]);
  /* 显示文本 */
  const startText = useMemo(() => {
    return leftPad(startHours, 2, "0") + ":00";
  }, [startHours]);
  const endText = useMemo(() => {
    return leftPad(endHours, 2, "0") + ":00";
  }, [endHours]);
  /* 滑动事件对应的回调函数 */
  /* 设置左侧起始开始位置 */
  function onStartTouchBegin(e) {
    const touch = e.targetTouches[0];
    lastStartX.current = touch.pageX;
  }
  /* 设置右侧起始开始位置 */
  function onEndTouchBegin(e) {
    const touch = e.targetTouches[0];
    lastEndX.current = touch.pageX;
  }
  function onStartTouchMove(e) {
    const touch = e.targetTouches[0];
    /* 需要移动的距离 = 当前移动到的距离 - 上一次的长度 */
    const distance = touch.pageX - lastStartX.current;
    /* 再将这次移动的长度存到lastStartX */
    lastStartX.current = touch.pageX;
    /* 当前百分比 = 原来的长度百分比 + (移动距离÷总距离)×100 */
    setStart((start) => start + (distance / rangeWidth.current) * 100);
  }
  function onEndTouchMove(e) {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastEndX.current;
    lastEndX.current = touch.pageX;
    setEnd((end) => end + (distance / rangeWidth.current) * 100);
  }
  /* **组件首次挂在完毕**后和**每次浏览器宽度变化**是读取range的长度 */
  useEffect(() => {
    rangeWidth.current = parseFloat(
      window.getComputedStyle(range.current).width
    );
  }, [winSize.width]);
  /* 监听range事件 */
  useEffect(() => {
    startHandle.current.addEventListener(
      "touchstart",
      onStartTouchBegin,
      false
    );
    startHandle.current.addEventListener("touchmove", onStartTouchMove, false);
    endHandle.current.addEventListener("touchstart", onEndTouchBegin, false);
    endHandle.current.addEventListener("touchmove", onEndTouchMove, false);

    return () => {
      startHandle.current.removeEventListener(
        "touchstart",
        onStartTouchBegin,
        false
      );
      startHandle.current.removeEventListener(
        "touchmove",
        onStartTouchMove,
        false
      );
      endHandle.current.removeEventListener(
        "touchstart",
        onEndTouchBegin,
        false
      );
      endHandle.current.removeEventListener("touchmove", onEndTouchMove, false);
    };
  });
  useEffect(() => {
    onStartChanged(startHours);
  }, [startHours]);

  useEffect(() => {
    onEndChanged(endHours);
  }, [endHours]);
  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={range}>
          <div
            className="slider-range"
            style={{
              left: startPercent + "%",
              width: endPercent - startPercent + "%",
            }}
          ></div>
          <i
            ref={startHandle}
            className="slider-handle"
            style={{
              left: startPercent + "%",
            }}
          >
            <span>{startText}</span>
          </i>
          <i
            ref={endHandle}
            className="slider-handle"
            style={{
              left: endPercent + "%",
            }}
          >
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  );
});

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  currentStartHours: PropTypes.number.isRequired,
  currentEndHours: PropTypes.number.isRequired,
  onStartChanged: PropTypes.func.isRequired,
  onEndChanged: PropTypes.func.isRequired,
};

export default Slider;
