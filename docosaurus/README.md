# The Guild Handbook

This is the repository for [The Guild Handbook](https://probable-eureka-d9af6aa6.pages.github.io/) website.

Visit the live website at [guild-handbook.mckinsey.com](https://guild-handbook.mckinsey.com). Check the [Contibutors Guide](./docs/appendices/contributing.md) to find out how to contribute to the project!

There is also a [Box Folder dedicated to the Guild Handbook](https://mckinsey.ent.box.com/folder/134408239944). This folder contains resources which might be sensitive (e.g. AP level training) or that are not appropriate to store in the repository. Remember - in most cases we will just be able to link to an intranet site, so the Box Folder should be used rarely.

<!-- vim-markdown-toc GFM -->

* [Contributing to the Website](#contributing-to-the-website)
    * [Installation](#installation)
    * [Local Development](#local-development)
    * [Testing](#testing)
    * [Build](#build)
    * [Deployment](#deployment)
    * [Update contibutor list](#update-contibutor-list)
* [Contributors ✨](#contributors-)

<!-- vim-markdown-toc -->

## Contributing to the Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

**tl;dr**

| Command       | Description                                              |
| ------------- | -------------------------------------------------------- |
| `make init`   | Install dependencies.                                    |
| `make dev`    | Run the local development server.                        |
| `make build`  | Build the site, check links.                             |
| `make deploy` | Deploy to GitHub pages - requires an admin user account. |

### Installation

You'll need `npm` installed. I recommend installing [Node Version Manager](https://github.com/nvm-sh/nvm).

Make sure you are using a recent version of Node (in this example we use LTS - i.e. the current Long Term Support), then install dependencies:

```sh
nvm install --lts
nvm use --lts
npm install
```

### Local Development

Local development is easy! Just run:

```sh
npm start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Testing

Verify you have no broken links by running the build:

```sh
npm run build
```

### Build

Package the site into the `./build/` folder with:

```sh
npm run build
```

The `./build` folder will now contain the static site ready to be deployed to any service which can host static HTML content.

### Deployment

Open a pull request! Once it is merged the changes will be deployed. You can see the details of the build process in:

[`./todo-path-to-biuld`](./todo)

Content is built into the `gh-pages` branch.

```console
GIT_USER=dave_kerr@mckisney.com GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Update contibutor list

To add a contributor in below list is easy just execute a command below.

```console
# Add new contributor <username>, who made a contribution of type <contribution>
npm run contributors:add <username> <contribution>

# Example:
npm run contributors:add jfmengels code,doc
```

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.dwmkerr.com/"><img src="https://avatars.githubusercontent.com/u/1926984?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Dave Kerr</b></sub></a><br /><a href="https://github.com/McKinsey & Company/The Guild Handbook/commits?author=dwmkerr" title="Code">💻</a> <a href="https://github.com/McKinsey & Company/The Guild Handbook/commits?author=dwmkerr" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/mindmelting"><img src="https://avatars.githubusercontent.com/u/1621782?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Lawrence</b></sub></a><br /><a href="https://github.com/McKinsey & Company/The Guild Handbook/commits?author=mindmelting" title="Code">💻</a> <a href="https://github.com/McKinsey & Company/The Guild Handbook/commits?author=mindmelting" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/sohumsachathamakul"><img src="https://avatars.githubusercontent.com/u/47490307?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Sohum</b></sub></a><br /><a href="https://github.com/McKinsey & Company/The Guild Handbook/commits?author=sohumsachathamakul" title="Code">💻</a> <a href="https://github.com/McKinsey & Company/The Guild Handbook/commits?author=sohumsachathamakul" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/tobiasbueschel"><img src="https://avatars.githubusercontent.com/u/13087421?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Tobias Büschel</b></sub></a><br /><a href="https://github.com/McKinsey & Company/The Guild Handbook/commits?author=tobiasbueschel" title="Code">💻</a> <a href="https://github.com/McKinsey & Company/The Guild Handbook/commits?author=tobiasbueschel" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/tengis"><img src="https://avatars.githubusercontent.com/u/358442?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Tengis Batsaikhan</b></sub></a><br /><a href="https://github.com/McKinsey & Company/The Guild Handbook/commits?author=tengis" title="Code">💻</a> <a href="https://github.com/McKinsey & Company/The Guild Handbook/commits?author=tengis" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
