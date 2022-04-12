import React from 'react';
import ReactLiveScope from '@theme-original/ReactLiveScope';

//  Components to make available to the editor.
//  Note that adding the CodeBlock to the context seems to cause a webpack
//  error, so for now I just use <code>.
//  import CodeBlock from '@theme/CodeBlock';

import AnnotatedCommand from '@site/src/components/AnnotatedCommmand/AnnotatedCommand.tsx';
import AsciinemaPlayer from '@site/src/components/AsciinemaPlayer/AsciinemaPlayer.tsx';
import Caret from '@site/src/components/Caret/Caret.tsx';

const ReactLiveScopeWrapper = (props) => (
  <>
    <ReactLiveScope {...props} />
  </>
);

//  Add any custom components you want to have available in the React Live
//  Codeblock component to the ReactLiveScopeWrapper below.
ReactLiveScopeWrapper.AnnotatedCommand = AnnotatedCommand;
ReactLiveScopeWrapper.AsciinemaPlayer = AsciinemaPlayer;
ReactLiveScopeWrapper.Caret = Caret;

export default ReactLiveScopeWrapper;
