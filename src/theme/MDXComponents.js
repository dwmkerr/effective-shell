import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import AnnotatedCommand from '@site/src/components/AnnotatedCommmand/AnnotatedCommand.tsx';
import Caret from '@site/src/components/Caret/Caret.tsx';

export default {
  // Re-use the default mapping
  ...MDXComponents,

  //  Expert components for each page.
  AnnotatedCommand,
  Caret,
};
