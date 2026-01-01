import React from 'react';
import Admonition from '@theme/Admonition';

interface ZshNoteProps {
  children: React.ReactNode;
}

const ZshNote: React.FC<ZshNoteProps> = ({ children }) => {
  return (
    <Admonition type="info" title="Z Shell">
      {children}
    </Admonition>
  );
};

export default ZshNote;
