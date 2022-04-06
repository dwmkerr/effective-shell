// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

//  Load our package so we can show metadata like the version.
const package = require('./package.json');

const title = 'Effective Shell';
const organizationName = 'dwmkerr';
const projectName = 'effective-shell';
const githubRepoUrl = `https://github.com/${organizationName}/${projectName}/`
const editUrl = `${githubRepoUrl}/edit/main/`;

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

          //  We don't need the breadcrumbs as we don't have much nesting and
          //  they distract from the core content at the top of each page.
          breadcrumbs: false,
          
          //  Set the route base path - it doesn't need 'docs' or 'blog' as we
          //  only have a single set of documents to show.
          routeBasePath: '/',

          //  Set the edit URL to allow users to open pull requests easily.
          editUrl: editUrl,
        },
        blog: false,
        theme: {
          //  It looks like Docosaurus doesn't yet support directly importing
          //  this style in the EmailSignupForm component, so as a workaround
          //  it is imported here, along with other stylesheets we need.
          customCss: [
            require.resolve('react-mailchimp-email-signup-form/dist/esm/index.css'),
            require.resolve('asciinema-player/dist/bundle/asciinema-player.css'),
          ],
        },
        gtag: {
          trackingID: 'G-8HZFMZV9Z4',
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
          {
            type: 'search',
            position: 'right',
          },
          {
            href: githubRepoUrl,
            label: 'GitHub',
            position: 'right',
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
        copyright: `Effective Shell v${package.version}. Copyright © ${new Date().getFullYear()} Dave Kerr. Website built with Docusaurus.`,
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
    [
      require.resolve('docusaurus-plugin-drawio'),
      {}
    ],
  ],
};

module.exports = config;
