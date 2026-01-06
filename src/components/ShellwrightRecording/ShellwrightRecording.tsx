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
      {showPrompt ? (
        <div className={styles.prompt}>{children}</div>
      ) : (
        <img src={src} alt={alt || 'Shell recording'} className={styles.gif} />
      )}
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
            {showPrompt ? 'Show recording' : 'Show prompt'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShellwrightRecording;
