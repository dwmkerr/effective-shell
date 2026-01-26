// Redirect configuration for Effective Shell
// Each entry: { from: '/old-path/', to: '/new-path/' }
// Test with: npm run build && npm run serve, then visit old URLs

const redirects = [
  // Test redirect - verify system works
  {
    from: '/appendix/setup/',
    to: '/appendices/setup/',
  },

  // Part 1 index → Appendix B
  {
    from: '/part-1-transitioning-to-the-shell/',
    to: '/appendices/shell-basics/',
  },

  // Part 1 chapters → Appendix B
  {
    from: '/part-1-transitioning-to-the-shell/getting-started/',
    to: '/appendices/shell-basics/',
  },
  {
    from: '/part-1-transitioning-to-the-shell/navigating-your-system/',
    to: '/appendices/shell-basics/',
  },
  {
    from: '/part-1-transitioning-to-the-shell/managing-your-files/',
    to: '/appendices/shell-basics/',
  },
  {
    from: '/part-1-transitioning-to-the-shell/become-a-clipboard-gymnast/',
    to: '/appendices/shell-basics/',
  },
  {
    from: '/part-1-transitioning-to-the-shell/getting-help/',
    to: '/appendices/shell-basics/',
  },

  // Renaissance of the Shell → Appendix C: Perspectives
  {
    from: '/part-1-transitioning-to-the-shell/the-renaissance-of-the-shell/',
    to: '/appendices/perspectives/',
  },

  // Part renumbering redirects (old website URLs → new book-aligned URLs)
  {
    from: '/part-2-core-skill/',
    to: '/part-1-core-skills/',
  },
  {
    from: '/part-3-manipulating-text/',
    to: '/part-2-manipulating-text/',
  },
  {
    from: '/part-4-shell-scripting/',
    to: '/part-3-shell-scripting/',
  },
  {
    from: '/part-5-building-your-toolkit/',
    to: '/part-4-building-your-toolkit/',
  },
  {
    from: '/part-6-advanced-techniques/',
    to: '/part-5-advanced-techniques/',
  },
];

module.exports = redirects;
