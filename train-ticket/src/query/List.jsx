import React, { memo, useMemo } from "react";
import URI from "urijs";
import PropTypes from "prop-types";
import "./List.css";

const List = memo(function List(props) {
  return <ul className="list"></ul>;
});

List.propTypes = {};

export default List;
