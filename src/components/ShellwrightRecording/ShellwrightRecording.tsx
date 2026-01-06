import React, { useState } from 'react';
import styles from './ShellwrightRecording.module.css';

type ShellwrightRecordingProps = {
  src: string;
  alt?: string;
  prompt?: string;
};

const ShellwrightRecording: React.FC<ShellwrightRecordingProps> = ({
  src,
  alt,
  prompt
}) => {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className={styles.container}>
      <img src={src} alt={alt || 'Shell recording'} className={styles.gif} />
      <div className={styles.footer}>
        <span className={styles.credit}>
          Generated with{' '}
          <a href="https://github.com/dwmkerr/shellwright">Shellwright</a>
        </span>
        {prompt && (
          <button
            className={styles.toggle}
            onClick={() => setShowPrompt(!showPrompt)}
          >
            {showPrompt ? 'Hide prompt' : 'Show prompt'}
          </button>
        )}
      </div>
      {showPrompt && prompt && (
        <pre className={styles.prompt}>{prompt}</pre>
      )}
    </div>
  );
};

export default ShellwrightRecording;
