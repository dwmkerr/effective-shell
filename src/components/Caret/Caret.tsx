// @ts-check
import React from 'react';

enum CaretStyle {
  default = 'block',
  block = 'block',
  line = 'line',
}

interface CaretProps {
  //  The optional style of the caret.
  caretStyle?: CaretStyle;
  children: JSX.Element;
}

const blockCaretStyle = {
  color: '#FFFFFF',
  background: '#333333',
};

const lineCaretStyle = {
  boxShadow: 'inset 1px 0px #000000',
  background: '#FFFFFF11',
};

const caretStyleToCssObject = (caretStyle: CaretStyle) => {
  switch (caretStyle) {
    case CaretStyle.block: return blockCaretStyle;
    case CaretStyle.line: return lineCaretStyle;
    default: return blockCaretStyle;
  }
}


const Caret: React.FC<CaretProps> = ({
  caretStyle = CaretStyle.block,
  children,
}: CaretProps) => (
   <span style={caretStyleToCssObject(caretStyle)}>{children}</span>
);

export default Caret;
