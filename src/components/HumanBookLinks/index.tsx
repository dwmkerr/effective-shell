import React from 'react';
import { humanBookUrl } from './url';
import './styles.css';

type Action = 'listen' | 'chat' | 'reader';

const ICONS: Record<Action, React.ReactNode> = {
  listen: (
    <>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  reader: (
    <path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z" />
  ),
};

const LINKS: { action: Action; label: string }[] = [
  { action: 'listen', label: 'Listen' },
  { action: 'chat', label: 'Chat' },
  { action: 'reader', label: 'Reader' },
];

// All three actions sit together on every chapter, so a click on each one
// shows directly which way of reading people want (data-book-cta hb-*).
const HumanBookLinks: React.FC<{ chapter: string }> = ({ chapter }) => (
  <div className="human-book-links">
    {LINKS.map(({ action, label }) => (
      <a
        key={action}
        className={`human-book-link human-book-link--${action}`}
        href={humanBookUrl(action, 'lead', chapter)}
        data-book-cta={`hb-${action}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {ICONS[action]}
        </svg>
        {label}
      </a>
    ))}
    <span className="human-book-links__note">Free on Human Book</span>
  </div>
);

export default HumanBookLinks;
