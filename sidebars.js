// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    'index',
    {
      type: 'category',
      label: 'Part I - Core Skills',
      link: { type: 'doc', id: 'core-skills/index'},
      items: [
        'core-skills/thinking-in-pipelines/index',
        'core-skills/fly-on-the-command-line/index',
        'core-skills/job-control/index',
        'core-skills/understanding-commands/index',
        'core-skills/finding-files/index',
        'core-skills/what-is-a-shell/index',
      ]
    },
    {
      type: 'category',
      label: 'Part II - Manipulating Text and Streams',
      link: { type: 'doc', id: 'manipulating-text/index'},
      items: [
        'manipulating-text/regex-essentials/index',
        'manipulating-text/get-to-grips-with-grep/index',
        'manipulating-text/slice-and-dice-text/index',
        'manipulating-text/advanced-text-manipulation/index',
        'manipulating-text/build-commands-on-the-fly/index',
      ]
    },
    {
      type: 'category',
      label: 'Part III - Shell Scripting',
      link: { type: 'doc', id: 'shell-scripting/index'},
      items: [
        'shell-scripting/shell-script-essentials/index',
        'shell-scripting/variables-reading-input-and-mathematics/index',
        'shell-scripting/mastering-conditional-logic/index',
        'shell-scripting/loops-and-working-with-files-and-folders/index',
        'shell-scripting/functions-parameters-and-error-handling/index',
        'shell-scripting/useful-patterns-for-shell-scripts/index',
      ]
    },
    {
      type: 'category',
      label: 'Part IV - Building Your Toolkit',
      link: { type: 'doc', id: 'building-your-toolkit/index'},
      items: [
        'building-your-toolkit/configuring-the-shell/index',
        'building-your-toolkit/customising-your-command-prompt/index',
        'building-your-toolkit/managing-your-dotfiles/index',
        'building-your-toolkit/controlling-changes-with-git/index',
        'building-your-toolkit/managing-remote-git-repositories/index',
      ]
    },
    {
      type: 'category',
      label: 'Part V - Advanced Techniques',
      link: { type: 'doc', id: 'advanced-techniques/index'},
      items: [
        'advanced-techniques/understanding-shell-expansion/index',
        'advanced-techniques/how-to-avoid-scripting/index',
        'advanced-techniques/the-secure-shell/index',
        'advanced-techniques/a-vim-crash-course/index',
        'advanced-techniques/master-the-multiplexer/index',
      ]
    },
    {
      type: 'category',
      label: 'Appendices',
      items: [
        'xx-appendices/setup/index',
        'xx-appendices/shell-basics/index',
        'xx-appendices/perspectives/index',
      ]
    },
    'zz-coming-soon/index',
  ],
};

module.exports = sidebars;
