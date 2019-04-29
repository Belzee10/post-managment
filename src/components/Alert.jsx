import React from "react";
import PropTypes from "prop-types";

const Alert = props => {
  const { children, type } = props;
  return (
    <div className={`alert alert-${type}`} role="alert">
      {children}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  type: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
  ])
};

Alert.defaultProps = {
  children: null,
  type: "danger"
};

export default Alert;
