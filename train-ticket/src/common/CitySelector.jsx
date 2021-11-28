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

/* 侧边的字母导航 */
const AlphaIndex = memo(function AlphaIndex(props) {
  const { alpha, onClick } = props;
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
});
AlphaIndex.prototype = {
  alpha: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

/* 包含26个英文字母的数组 */
const alphabet = Array.from(new Array(26), (ele, index) =>
  //charCode英文字母从65开始
  String.fromCharCode(65 + index)
);

/* 相同首字母的城市集合 */
const CitySection = memo(function CitySection(props) {
  const { title, cities = [], onSelect } = props;
  return (
    <ul className="city-ul">
      <li className="city-li" key={nanoid()} data-cate={title}>
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
  const { onSelect, sections, toAlpha } = props;

  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map((section) => {
          return (
            <CitySection
              key={nanoid()}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      <div className="city-index">
        {alphabet.map((alpha) => {
          return <AlphaIndex key={nanoid()} alpha={alpha} onClick={toAlpha} />;
        })}
      </div>
    </div>
  );
});
CityList.prototype = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

/* 显示搜索结果的组件 */
const SuggestItem = memo(function SuggestItem(props) {
  const { name, onClick } = props;
  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>
      {name}
    </li>
  );
});
SuggestItem.prototype = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

/* 根据搜索结果展示的列表 */
const Suggest = memo(function Suggest(props) {
  const { searchKey, onSelect } = props;
  const [result, setResult] = useState([]);
  useEffect(() => {
    console.log(searchKey);
    /* encodeURIComponent转义函数 */
    fetch("/rest/search?key=" + encodeURIComponent(searchKey))
      .then((res) => res.json())
      .then((data) => {
        const { result, searchKey: sKey } = data;
        /* 由于可能会同时发出多个请求，这里要判断发出的请求和返回的结果一致性 */
        if (sKey === searchKey) {
          setResult(result);
        }
      });
  }, [searchKey]);

  /* 更新前判断数据是否为空 */
  const fallBackResult = useMemo(() => {
    if (result.length === 0) {
      return [{ display: searchKey }];
    } else {
      return result;
    }
  }, [result, searchKey]);
  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map((item) => {
          return (
            <SuggestItem
              key={nanoid()}
              name={item.display}
              onClick={onSelect}
            />
          );
        })}
      </ul>
    </div>
  );
});
Suggest.prototype = {
  searchKey: PropTypes.string.isRequired,
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

  /* 侧边字母导航点击事件toAlpha */
  const toAlpha = useCallback((alpha) => {
    // 根据城市集合的标题，用scrollIntoView跳转到相应的位置
    document.querySelector(`[data-cate=${alpha}]`).scrollIntoView();
  }, []);

  //展示城市浮窗内容
  const outputCitySection = () => {
    if (isLoadingCityData) {
      return <div>loading</div>;
    }
    if (cityData) {
      return (
        <CityList
          sections={cityData.cityList}
          onSelect={onSelect}
          toAlpha={toAlpha}
        />
      );
    }
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
      {Boolean(key) && (
        <Suggest searchKey={key} onSelect={(key) => onSelect(key)} />
      )}
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
