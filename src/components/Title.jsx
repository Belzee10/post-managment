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
  ]),
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"])
};

Title.defaultProps = {
  children: null,
  type: "h2"
};

export default Title;
