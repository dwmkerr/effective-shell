// Override document title to always be just "Effective Shell"
if (typeof window !== 'undefined') {
  const title = 'Effective Shell';

  // Set initial title
  document.title = title;

  // Override on route changes
  const observer = new MutationObserver(() => {
    if (document.title !== title) {
      document.title = title;
    }
  });

  observer.observe(document.querySelector('title') || document.head, {
    subtree: true,
    childList: true,
    characterData: true,
  });
}
