import React from 'react';
import './styles.css'; // Import your CSS styles

const AmazonBookPreview = ({ title, imageUrl, affiliateLink }) => {
  return (
    <div className="book-preview">
      <img src={imageUrl} alt={title} className="book-image" />
      <h2>{title}</h2>
      <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="buy-link">
        Buy on Amazon
      </a>
    </div>
  );
};

export default AmazonBookPreview;

