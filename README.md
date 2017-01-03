# External webapp component starter

Web application component starter for either single-page apps or non-SPA pages.

Inspired by [`webpack-library-starter`](https://github.com/krasimir/webpack-library-starter) by
[Krasimir Tsonev](https://github.com/krasimir)

# Table of Contents

- [Process Schema](#process-schema)
- [Getting Started](#getting-started)
- [Walkthrough](#walkthrough)
  - [Dependencies](#dependencies)
    - [Node](#node)
      - [Keeping npm packages local](#keeping-npm-packages-local)
      - [Dependency management](#dependency-management)
  - [Build & Development System](#build--development-system)
  - [Project integrity](#project-integrity)
    - [Shared editor configuration](#shared-editor-configuration)
    - [Static code analysis](#static-code-analysis)
    - [Final thoughts on integrity](#final-thoughts-on-integrity)
  - [Testing](#testing)
- [Misc](#misc)
  - [UMD](#umd)
  - [Bundled dependencies vs. externals](#bundled-dependencies-vs-externals)

# Process schema

```plaintext
  ES6 source files
          |
          |
      webpack
          |
          +--- babel, eslint, postcss, stylelint etc.
          |
    ------+------
    |           |
    |           |
    |           |
    |           |
    |           |
component   component + bundled dependencies
  in UMD      in UMD
  format      format
```

*Have in mind that you have to build your library before publishing. The files under the `dist` folder are the ones
that should be distributed.*


# Getting started

1. Setting up the name of your library
  - Open `package.json` file
  - change the value of `name` property so it has a name you want it published under.
  - change the value of `main` property with the intended name of your component distribution file. Webpack will build
  the bundle and name it like this.
2. Build your library
  - Run `npm install` to get the project's dependencies
  - Run `npm run build` to produce minified version of your component. 2 versions are produced: one with only
  `bundledDependencies` and other with all `dependencies` bundled.
3. Development mode
  - Having all the dependencies installed run `npm run dev`. This command will generate an non-minified version of your
  library and will run a watcher so you get the compilation on file change.
4. Running the tests
  - Run `npm run test`

# Walkthrough

## Dependencies

### Node

The build system is meant to be run on node 5+ because some scripts are written using ES2015+ syntax. It is purely for
convenience, but you should use the latest & greatest Node anyway. Or at least the [most recent LTS](https://github.com/nodejs/LTS)
version of it.

It is highly recommended for you to install [`nvm`](https://github.com/creationix/nvm) (or [`nvm-windows`](https://github.com/coreybutler/nvm-windows))
to manage Node versions installed on your machine. Without it you'll struggle with Node updates every time the team
decides to update.

It is also recommended to install latest version of `npm` itself: `npm update -g npm`.

_Related config files_:
- [.nvmrc](./.nvmrc)

_Related commands_:
- `nvm use`

#### Keeping npm packages local

Starter was developed with "no global dependencies but Node itself" in mind. This means that as long as you stick to
this readme you should not be required to have any globally installed (which means: don't do `npm install -g *` even
if package readme tells you to.

Some packages, like [`gulp`](https://www.npmjs.com/package/gulp) advise you to install them globally for your current
version of Node. This is basically a poor solution once you want to develop on the latest version of Node since on each
update you have to [reinstall packages](https://github.com/creationix/nvm#migrating-global-packages-while-installing)
from the previous version which is easy to be forgotten about and thus inconvenient.

Most such packages can be installed locally, because there's nothing (but the fact that they are intended to be used in
CLI) keeps them from being local. To handle that this starter defines an [`npm script`](https://docs.npmjs.com/misc/scripts)
for each significant CLI tool we install via npm.

#### Dependency management

Starter is equipped with [`npm-check-updates`](https://www.npmjs.com/package/npm-check-updates) which finds stale
dependencies (run `npm run dependencies:check-updates`) and updates them (run `npm run dependencies:update`).

## Build & Development System

This starter uses NPM scripts (most of the times) for wrapping various CLI tools: sometimes as Webpack loaders,
sometimes directly.

- [`Webpack`](https://webpack.github.io) handles all file-related concerns:
  - Loading JS files as modules
  - Loading HTML files as modules
  - _Pre-_ and _post-_processing stylesheets via [`sass`](https://github.com/jtangelder/sass-loader) and
  [`postcss`](https://github.com/postcss/postcss-loader) [loaders](https://webpack.github.io/docs/loaders.html)
  - Rebuilding on file changes
  - Preparing distribution versions

  _Related config files_:
  - [webpack config](./webpack.config.js)

  _Related commands_:
  - `npm run build`
  - `npm run dev`

- [`Babel`](https://babeljs.io) handles transformation of latest JS syntax into something today's browsers can
understand. Because projects build on top of this starter are supposed to be dependencies of other projects we can't
assume that we know what are the targets.

  _Related config files_:
  - [.babelrc](./.babelrc)
  - [browserslist](./browserslist)

- [`Sass`](http://sass-lang.com) (technically: [`node-sass`](https://www.npmjs.com/package/node-sass) which is way
faster than the original Ruby Sass) is used to process authored stylesheets (written as `*.scss`) into browser-suitable
CSS

  _Related config files_:
  - [sass.conf.js](./sass.conf.js)

- [`PostCSS`](http://postcss.org) is used to process that CSS even further (with [postcss plugins](http://postcss.parts)
like [`autoprefixer`](https://github.com/postcss/autoprefixer) for performing CSS-to-CSS manipulations).

  _Related config files_:
  - [.postcssrc](./.postcssrc)
  - [browserslist](./browserslist)

- [`localdev`](https://github.com/jrencz/localdev) provides a way to facilitate development of both the project and its
dependencies installed via NPM.

  _Related config files_:
  - [localdev.config.json](./localdev.config.json)

  _Related commands_:
  - `npm run localdev-start`: command allows this project to be run as locally-linked dependency (with its own build).
  __NOTE__: this command is not meant to be run manually. It is instead meant as a hook.

## Project integrity

### Shared editor configuration

- [`.editorconfig`](http://editorconfig.org) is used to ensure editor/IDE settings consistency.

  _Related config files_:
  - [.editorconfig](./.editorconfig)

### Static code analysis

- [`ESLint`](http://eslint.org) takes care of JS code quality

  _Related config files_:
  - [General .eslintrc.json](./.eslintrc.json)
  - [ESLint config for authored code](./src/.eslintrc.json)
  - [ESLint config for authored tests](./test/.eslintrc-tests.js)
  - [.eslintignore](./.eslintignore)

  _Related commands_:
  - `npm run lint:code`

- [`Stylelint`](http://stylelint.io) handles styles (SCSS).

  _Related config files_:
  - [.stylelintrc](./.stylelintrc)

  _Related commands_:
  - `npm run lint:styles`

- [`lintspaces`](https://www.npmjs.com/package/lintspaces) checks whether files conform with `.editorconfig` (apart from
integrating with your editor of choice)

  _Related config files_:
  - [.editorconfig](./.editorconfig)

  _Related commands_:
  - `npm run lint:editorconfig`

### Final thoughts on integrity

If `.editorconfig`/`.eslintrc`/`.stylelintrc` has no way to express it then feel free to write it as you want. Only
automation is privileged to reproach you about how you write code. Note that it's more than worth to encode each rule
a team wants to obey into a linter rule so no one will ever forget about it.

## Testing

Tests are run with [`Mocha`](http://mochajs.org/) as both runner and framework and [`Chai`](http://chaijs.com/) as
assertion library.

To run tests constantly run `npm run dev` in one terminal and `npm run test:dev` in other. Tests will be rerun on each
source change and on each tests change.

_Related commands_:
- `npm run test` - run tests once. It will build the library and test it.
- `npm run test:dev` - runs tests constantly watching for test changes
- `npm run test:once` - runs tests once using already built version of component

# Misc

## UMD

Component is packed using [UMD (Universal Module Definition)](https://github.com/umdjs/umd) format which means it's
available in various module definition systems (AMD, commonJS, etc))

## Bundled dependencies vs. externals

You may express that the distributed version of the component you're building will have unbundled dependencies. E.g.
it's not worth to bundle Angular or React if you;re building a component of meant to be run in an app that has either of
those libraries. On the other hand there may be some dependencies that are very specific to what your component does and
therefore highly unlikely to be in the project that uses your component.

By default all your dependencies are __NOT__ bundled thus treated as externals in the bundle built into `main` in
`package.json`. To declare a dependency as bundled you need to add it to `bundledDependencies` in `package.json`.

Note that 2 versions of your component are built: one named after `main` field from `package.json` and another one with
`-bundled` suffix. `-bundled` version has __ALL__ dependencies bundled. __It's not meant for production__, but rather
as a proof of concept when one starts using the component in a project and therefore may either not have all expected
dependencies set up or when project depends on a distinct and/or conflicting version of a common dependency.

- [Externals (from Webpack Documentation)](http://webpack.github.io/docs/configuration.html#externals)
