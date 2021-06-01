module.exports = {
  title: 'Effective Shell',
  tagline: 'Essential productivity techniques for software engineers, data scientists and all modern technologists',
  url: 'https://effective-shell.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'dwmkerr',
  projectName: 'effective-shell',
  themeConfig: {
    navbar: {
      title: 'Effective Shell',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/',
          label: 'Docs',
          position: 'left',
        },
        // {
        //   to: 'blog',
        //   label: 'Blog',
        //   position: 'left'
        // },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/dwmkerr/effective-shell',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Contributing',
              to: 'appendices/contributing',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/effective-shell',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/dwmkerr',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dave Kerr`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          //  We use 'docs only' mode as described at: https://v2.docusaurus.io/docs/docs-introduction#docs-only-mode
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl:
            'https://github.com/dwmkerr/effective-shell/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

    // Include the mailchimp JS in each page.
  // See:
  // - https://stackoverflow.com/questions/65659478/how-can-custom-scripts-be-added-in-index-htmls-head-part-in-docusaurus
  // - https://docusaurus.io/docs/docusaurus.config.js#scripts
  scripts: [
     '/scripts/mailchimp.js'
  ],


  plugins: [
    [require.resolve('@cmfcmf/docusaurus-search-local'), {
      docsRouteBasePath: '/',
    }]
  ],
};
