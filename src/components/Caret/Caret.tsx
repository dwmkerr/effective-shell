// @ts-check

import React from 'react';

type CaretProps = {
  style: React.CSSProperties;
};

const caretStyle = {
  color: '#FFFFFF',
  background: '#333333',
};

const Caret: React.FC<CaretProps> = ({
  children,
}) => {
  return (
    <span style={caretStyle}>{children}</span>
  )
};

export default Caret;
