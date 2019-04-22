import React from "react";

/**
 * @description return outline Bootstrap's class
 * @param {String} type
 */
const outlineClass = type => `btn-outline-${type}`;

const Button = props => {
  const { type, size, outline, children } = props;
  return (
    <button
      className={`btn btn-${type} btn-${size} ${
        outline ? outlineClass(type) : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
