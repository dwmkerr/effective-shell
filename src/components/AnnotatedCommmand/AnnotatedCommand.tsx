// @ts-check

import React from 'react';

type AnnotatedCommandProps = {
  annotation: string;
  style: React.CSSProperties;
};

const annotationStyle = {
  color: '#333333',
  fontStyle: 'italic',
};

const AnnotatedCommand: React.FC<CaretProps> = ({
  annotation,
  children,
}) => {
  return (
    <div>
      <span><code>{children}</code></span>
      <br />
      <br />
      <small style={annotationStyle}>
        {annotation}
      </small>
    </div>
  )
};

export default AnnotatedCommand;
