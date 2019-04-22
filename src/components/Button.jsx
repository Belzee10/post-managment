import React from "react";

const Button = props => {
  const { type, size, children } = props;
  return <button className={`btn btn-${size} btn-${type}`}>{children}</button>;
};

export default Button;
