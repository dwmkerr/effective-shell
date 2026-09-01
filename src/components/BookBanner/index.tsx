import React from 'react';
import './styles.css';

const BookBanner: React.FC = () => {
  return (
    <p className="book-banner">
      You're reading the free online edition of Effective Shell. If you're
      finding it useful, please consider picking up the print or Kindle edition
      from{' '}
      <a href="https://nostarch.com/effective-shell" target="_blank" rel="noopener noreferrer">
        No Starch Press
      </a>{' '}
      or{' '}
      <a href="https://amzn.to/4ho0F91" target="_blank" rel="noopener noreferrer">
        Amazon
      </a>{' '}
      - or sharing it with someone who'd enjoy it.
    </p>
  );
};

export default BookBanner;
