// @ts-check
import React from 'react';

interface ShellPromptProps {
  children: JSX.Element;
}

const promptStyle = {
  color: '#00FF00',
};

const ShellPrompt: React.FC<ShellPromptProps> = ({
}: ShellPromptProps) => (
   <span style={promptStyle}>$ </span>
);

export default ShellPrompt;
