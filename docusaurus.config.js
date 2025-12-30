// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

//  Load our package so we can show metadata like the version.
const packageJson = require('./package.json');

const title = 'Effective Shell';
const organizationName = 'dwmkerr';
const projectName = 'effective-shell';
const githubRepoUrl = `https://github.com/${organizationName}/${projectName}/`
const editUrl = `${githubRepoUrl}/edit/main/`;

// Allow baseUrl override via environment variable for PR previews
const baseUrl = process.env.BASE_URL || '/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: title,
  tagline: 'Essential techniques for the modern technologist',
  clientModules: [require.resolve('./src/clientModules/titleOverride.js')],
  url: 'https://effective-shell.com',
  baseUrl: baseUrl,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'throw',
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
          customCss: [
            require.resolve('asciinema-player/dist/bundle/asciinema-player.css'),
            require.resolve('./src/css/custom.css'),
          ],
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
          src: 'images/mini-cover-illustration.png',
        },
        items: [
          {
            to: '/introduction/',
            position: 'left',
            label: 'The Book',
            activeBaseRegex: '^/(?!shell-snippets).*',
          },
          {
            to: '/shell-snippets/',
            position: 'left',
            label: 'Snippets',
            activeBasePath: '/shell-snippets/',
          },
          {
            href: 'https://nostarch.com/effective-shell',
            label: 'No Starch',
            position: 'right',
            className: 'header-nostarch-link',
          },
          {
            href: 'https://amzn.to/4ho0F91',
            label: 'Amazon',
            position: 'right',
            className: 'header-amazon-link',
          },
          {
            href: githubRepoUrl,
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            type: 'search',
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
              {
                label: 'Snippets',
                to: '/shell-snippets/',
              },
              {
                href: 'https://nostarch.com/effective-shell',
                label: 'No Starch',
              },
              {
                href: 'https://amzn.to/4ho0F91',
                label: 'Amazon',
              },
            ],
          },
          {
            title: 'Other Projects',
            items: [
              {
                href: 'https://github.com/dwmkerr/terminal-ai',
                label: 'Terminal AI',
                position: 'right',
              },
              {
                href: 'https://hacker-laws.com',
                label: 'Hacker Laws',
                position: 'right',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/dwmkerr/effective-shell',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/dwmkerr',
              },
            ],
          },
        ],
        copyright: `Effective Shell v${packageJson.version}. Copyright © ${new Date().getFullYear()} Dave Kerr. Website built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        //  Add theming support for languages we use.
        additionalLanguages: ['makefile'],
      },
      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         * We use 'top' as we are currently using this editor to preview
         * components, and we want to show the rendered component before its
         * code (see 'Developer Guide > Components').
         */
        playgroundPosition: 'top',
      },
      metadata: [{
        name: 'google-site-verification',
        content: 'ca-pub-6181461532532600',
      }],
    }),

  plugins: [
    [
      require.resolve('docusaurus-plugin-drawio'),
      {}
    ],
    [
      require.resolve('@docusaurus/theme-live-codeblock'),
      {}
    ],
    //  Ideal Image seems to clash with Docusaurus native lazy loading, causing
    //  most images not to load. So disabling this for now.
    // [
    //   require.resolve('@docusaurus/plugin-ideal-image'),
    //   {
    //     //  Enable this plugin in dev so that we can test it.
    //     disableInDev: false,
    //   },
    // ],
  ],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: ['/'],
        docsDir: 'docs',
        highlightSearchTermsOnTargetPage: true,
        language: ['en'],
      },
    ],
  ],
  scripts: [{
    src:
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6181461532532600',
      async: true,
  }, {
    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6181461532532600",
    async: true,
  }],
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WS7KMPTS');`,
    },
  ],
};

module.exports = config;
