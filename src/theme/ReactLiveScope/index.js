import React from 'react';
import ReactLiveScope from '@theme-original/ReactLiveScope';

//  Components to make available to the editor.
import CodeBlock from '@theme/CodeBlock';
import Caret from '@site/src/components/Caret/Caret.tsx';

const ReactLiveScopeWrapper = (props) => (
  <>
    <ReactLiveScope {...props} />
  </>
);

//  Add any custom components you want to have available in the React Live
//  Codeblock component to the ReactLiveScopeWrapper below.
ReactLiveScopeWrapper.Caret = Caret;

export default ReactLiveScopeWrapper;
