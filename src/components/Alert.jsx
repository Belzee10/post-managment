import React from "react";

const Alert = props => {
  const { children, type } = props;
  return (
    <div class={`alert alert-${type}`} role="alert">
      {children}
    </div>
  );
};

export default Alert;
