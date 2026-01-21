// Redirect configuration for Effective Shell
// Each entry: { from: '/old-path/', to: '/new-path/' }
// Test with: npm run build && npm run serve, then visit old URLs

const redirects = [
  // Test redirect - verify system works
  {
    from: '/appendix/setup/',
    to: '/appendices/setup/',
  },

  // Part 1 chapters → Appendix B (uncomment when deleting chapters)
  // {
  //   from: '/part-1-transitioning-to-the-shell/getting-started/',
  //   to: '/appendices/shell-basics/',
  // },
  // {
  //   from: '/part-1-transitioning-to-the-shell/navigating-your-system/',
  //   to: '/appendices/shell-basics/',
  // },
  // {
  //   from: '/part-1-transitioning-to-the-shell/managing-your-files/',
  //   to: '/appendices/shell-basics/',
  // },
  // {
  //   from: '/part-1-transitioning-to-the-shell/become-a-clipboard-gymnast/',
  //   to: '/appendices/shell-basics/',
  // },
  // {
  //   from: '/part-1-transitioning-to-the-shell/getting-help/',
  //   to: '/appendices/shell-basics/',
  // },

  // Part 2 → Part 1 (uncomment when renumbering)
  // {
  //   from: '/part-2-core-skills/',
  //   to: '/part-1-core-skills/',
  // },

  // Part 3 → Part 2 (uncomment when renumbering)
  // {
  //   from: '/part-3-manipulating-text/',
  //   to: '/part-2-manipulating-text/',
  // },

  // Part 4 → Part 3 (uncomment when renumbering)
  // {
  //   from: '/part-4-shell-scripting/',
  //   to: '/part-3-shell-scripting/',
  // },

  // Part 5 → Part 4 (uncomment when renumbering)
  // {
  //   from: '/part-5-building-your-toolkit/',
  //   to: '/part-4-building-your-toolkit/',
  // },

  // Part 6 → Part 5 (uncomment when renumbering)
  // {
  //   from: '/part-6-advanced-techniques/',
  //   to: '/part-5-advanced-techniques/',
  // },
];

module.exports = redirects;
