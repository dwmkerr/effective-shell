// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  snippetsSidebar: [
    'index',
    { type: 'html', value: '<hr style="margin: 0.5rem 0" />' },
    {
      type: 'doc',
      id: 'sourceenv/index',
      label: 'sourceenv',
    },
  ],
};

module.exports = sidebars;
