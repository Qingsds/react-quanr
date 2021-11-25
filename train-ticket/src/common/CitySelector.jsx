import React, { useState, useCallback, useEffect, useMemo, memo } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import "./CitySelector.css";

/* 单个城市元素 */
const CityItem = memo(function CityItem(props) {
  const { name, onSelect } = props;
  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  );
});
CityItem.prototype = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

/* 相同首字母的城市集合 */
const CitySection = memo(function CitySection(props) {
  const { title, cities = [], onSelect } = props;
  return (
    <ul className="city-ul">
      <li className="city-li" key={nanoid()}>
        {title}
      </li>
      {cities.map((city) => {
        return <CityItem key={nanoid()} onSelect={onSelect} name={city.name} />;
      })}
    </ul>
  );
});

CitySection.prototype = {
  cities: PropTypes.array,
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

/* 所有城市的城市列表 */
const CityList = memo(function CityList(props) {
  const { onSelect, sections } = props;

  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map((section) => {
          return (
            <CitySection
              key={nanoid()}
              title={section.title}
              cities={section.cities}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
});
CityList.prototype = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

/* 城市列表浮层组件 */
const CitySelector = memo(function CitySelector(props) {
  const { onBack, show, cityData, isLoadingCityData, fetchCityData, onSelect } =
    props;
  const [searchKey, setSearchKey] = useState("");
  //只有在searchKey更新时，截取searchKey两边的空格，提升效率
  const key = useMemo(() => searchKey.trim(), [searchKey]);

  //组件挂在完毕后，加载数据
  useEffect(() => {
    //   如果show为false，正在加载，或是已经有了cityData，则直接返回不用加载
    if (!show || isLoadingCityData || cityData) return;
    fetchCityData();
  }, [show, isLoadingCityData, cityData]);

  //展示城市浮窗内容
  const outputCitySection = () => {
    if (isLoadingCityData) {
      return <div>loading</div>;
    }
    if (cityData) {
      return <CityList sections={cityData.cityList} onSelect={onSelect} />;
    }
    return <div>error</div>;
  };
  return (
    <div className={classnames("city-selector", { hidden: !show })}>
      <div className="city-search">
        {/* 返回按钮 */}
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        {/* 输入栏 */}
        <div className="search-input-wrapper">
          <input
            type="text"
            value={key}
            className="search-input"
            placeholder="请输入城市、车站的拼音或者汉字"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        {/* 当输入文字时，展示清除按钮 */}
        <i
          className={classnames("search-clean", { hidden: key.length === 0 })}
          onClick={() => {
            setSearchKey("");
          }}
        >
          &#xf063;
        </i>
      </div>
      {outputCitySection()}
    </div>
  );
});
CitySelector.prototype = {
  show: PropTypes.bool.isRequired,
  isLoadingCityData: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CitySelector;
