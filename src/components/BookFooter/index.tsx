import React from 'react';
import './styles.css';

const BookFooter: React.FC = () => {
  return (
    <div className="book-footer">
      <a href="https://amzn.to/4ho0F91" data-book-cta="finale-cover" target="_blank" rel="noopener noreferrer">
        <img
          src="/images/es-cover-3d.png"
          alt="Effective Shell book cover"
          className="book-footer-cover"
        />
      </a>
      <div className="book-footer-text">
        <p className="book-footer-lead">Enjoying Effective Shell?</p>
        <p>
          The print and Kindle editions are available now, published by No
          Starch Press.
        </p>
        <div className="book-footer-buttons">
          <a
            className="button button--primary"
            href="https://amzn.to/4ho0F91"
            data-book-cta="finale-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy on Amazon
          </a>
          <a
            className="button button--secondary button--outline"
            href="https://nostarch.com/effective-shell"
            data-book-cta="finale-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            No Starch Press
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookFooter;
