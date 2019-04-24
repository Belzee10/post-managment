import React from "react";
import PropTypes from "prop-types";

/**
 * @description return outline Bootstrap's class
 * @param {String} type
 */
const outlineClass = type => `btn-outline-${type}`;

const Button = props => {
  const { type, size, outline, children, className, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`${className} btn btn-${type} btn-${size} ${
        outline ? outlineClass(type) : ""
      }`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
  ]),
  size: PropTypes.oneOf(["", "sm", "lg"]),
  outline: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  type: "primary",
  size: "",
  outline: false,
  children: null,
  className: "",
  onClick: () => {}
};

export default Button;
