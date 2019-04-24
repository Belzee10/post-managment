import React from "react";
import PropTypes from "prop-types";

const Title = props => {
  const { children, type } = props;
  const Type = type;
  return <Type>{children}</Type>;
};

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Title.defaultProps = {
  children: null
};

export default Title;
