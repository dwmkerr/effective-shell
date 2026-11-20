// Links to Effective Shell on Human Book, shared by the chapter lead and the
// navbar (docusaurus.config.js, which can't import TypeScript).
const BOOK_URL = 'https://humanbookproject.com/try/effective-shell';

// Each link names what the reader asked for (play=1, chat=1) so Human Book can
// open in that mode once it supports it; until then every link opens the book.
const ACTION_PARAMS = {
  listen: { play: '1' },
  chat: { chat: '1' },
  reader: {},
};

function humanBookUrl(action, campaign, chapter) {
  const params = new URLSearchParams({
    ...ACTION_PARAMS[action],
    utm_source: 'effective-shell',
    utm_medium: 'website',
    utm_campaign: campaign,
    utm_content: action,
  });
  if (chapter) params.set('utm_term', chapter);
  return `${BOOK_URL}?${params.toString()}`;
}

module.exports = { humanBookUrl };
