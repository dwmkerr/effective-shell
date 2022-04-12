// @ts-check

import React from 'react';

type AnnotatedCommandProps = {
  annotation: string;
  style: React.CSSProperties;
  children: JSX.Element;
};

const annotationStyle = {
  color: '#333333',
  fontStyle: 'italic',
};

const AnnotatedCommand: React.FC<AnnotatedCommandProps> = ({
  annotation,
  children,
}: AnnotatedCommandProps) => {
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
