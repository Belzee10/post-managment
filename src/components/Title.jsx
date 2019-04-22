import React from "react";

const Title = props => {
  const { children, type } = props;
  const Type = type;
  return <Type>{children}</Type>;
};

export default Title;
