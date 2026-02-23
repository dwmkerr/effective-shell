import React from 'react';
import styles from './styles.module.css';

interface WebsiteOnlyProps {
  inline?: boolean;
}

const WebsiteOnly: React.FC<WebsiteOnlyProps> = ({ inline = false }) => {
  return (
    <span className={styles.websiteOnly} title="Bonus online content">
      🎁
    </span>
  );
};

export default WebsiteOnly;
