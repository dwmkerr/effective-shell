// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const title = 'Effective Shell';
const organizationName = 'dwmkerr';
const projectName = 'dwmkerr';
const editUrl = `https://github.com/${organizationName}/${projectName}/main`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: title,
  tagline: 'Essential techniques for the modern technologist',
  url: 'https://effective-shell.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'error',
  favicon: 'img/favicon.png',
  organizationName: organizationName,
  projectName: projectName,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        //  Configure the site to docs-only mode:
        //  https://docusaurus.io/docs/docs-introduction#docs-only-mode
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: editUrl,
        },
        blog: false,
        theme: {
          //  It looks like Docosaurus doesn't yet support directly importing
          //  this style in the EmailSignupForm component, so as a workaround
          //  it is imported here.
          customCss: [require.resolve( 'react-mailchimp-email-signup-form/dist/esm/index.css')],
        },
        gtag: {
          trackingID: 'UA-155335600-1',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: title,
        logo: {
          alt: 'Effective Shell Logo',
          src: 'img/logo.png',
        },
        items: [
          //  Create a link to the home page.
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Home',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Effective Shell',
            items: [
              {
                label: 'Home',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/effective-shell',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/dwmkerr',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Dave Kerr. Website built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        indexBlog: false, // we are not using the blog features.
      },
    ],
  ],
};

module.exports = config;
