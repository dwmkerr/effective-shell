import React, { useState, ReactNode } from 'react';
import styles from './ShellwrightRecording.module.css';

type ShellwrightRecordingProps = {
  src: string;
  alt?: string;
  children?: ReactNode;
};

const ShellwrightRecording: React.FC<ShellwrightRecordingProps> = ({
  src,
  alt,
  children
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
        {children && (
          <button
            className={styles.toggle}
            onClick={() => setShowPrompt(!showPrompt)}
          >
            {showPrompt ? 'Hide prompt' : 'Show prompt'}
          </button>
        )}
      </div>
      {showPrompt && children && (
        <div className={styles.prompt}>{children}</div>
      )}
    </div>
  );
};

export default ShellwrightRecording;
