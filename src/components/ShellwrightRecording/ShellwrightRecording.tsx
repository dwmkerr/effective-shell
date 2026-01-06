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
        <div className={styles.prompt}>
          <div className={styles.promptHeader}>
            This is the prompt used to generate this recording with{' '}
            <a href="https://github.com/dwmkerr/shellwright" target="_blank" rel="noopener noreferrer">Shellwright</a>.
          </div>
          {children}
        </div>
      ) : (
        <img src={src} alt={alt || 'Shell recording'} className={styles.gif} />
      )}
      <div className={styles.footer}>
        {children && (
          <>
            <span className={styles.credit}>
              Generated with{' '}
              <a href="https://github.com/dwmkerr/shellwright" target="_blank" rel="noopener noreferrer">Shellwright</a>
            </span>
            <button
              className={styles.toggle}
              onClick={() => setShowPrompt(!showPrompt)}
            >
              {showPrompt ? 'Show recording' : 'Show prompt'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShellwrightRecording;
