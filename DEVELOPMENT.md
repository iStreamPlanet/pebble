Follow the steps below to set up the repository to be run locally.

The `master` branch is automatically deployed via [CodeFresh](https://g.codefresh.io/) to [pebble.istreamplanet.net](https://pebble.istreamplanet.net).

#### Install the Packages

```shell
$ yarn
```

#### Start Development Server

```shell
$ yarn start
```

#### Run unit tests

```shell
$ yarn test
```

#### Run test coverage

Although not strictly enforced, we aim for 100% unit test coverage for each component.

```shell
$ yarn cover
```

#### Visual Regression Testing

Pebble uses [Chromatic](https://www.chromaticqa.com) and [Storybook](https://storybook.js.org/) for visual regression testing. Each push to the build service will run the Chromatic service. If there are visual changes detected in any component story, a maintainer will be required to review and approve/deny the difference in the [Chromatic App](https://www.chromaticqa.com/builds?appId=5c893af34635b40020991b72).

To run Chromatic on a local build, get Pebble's [Chromatic app code](https://www.chromaticqa.com/manage) and run the following command.

```shell
$ ./node_modules/.bin/chromatic test --app-code=<your-app-code>
```

For more information, see the [Chromatic Documentation](http://docs.chromaticqa.com/test).

Otherwise, Chromatic will run automatically when you push to a remote branch.

#### Run Documentation Site (React Styleguidist)

```shell
$ yarn styleguide
```

#### Run Storybook Site

```shell
$ yarn storybook
```

#### Build Documentation Site

```shell
$ yarn styleguide:build
```

---

## How to Release

### Release an Update

Package releases should be done through the following commands:

release a minor update

```shell
$ npm version minor -m "release package %s because reasons"
```

or for an alpha pre-release minor update

```shell
$ npm version pre-minor -m "release package %s as alpha because reasons" --preid=alpha
```

The following will then happen

- Execute a coverage test run to make sure everything is okay
- Bump the version number in `package.json` accordingly (see examples)
- Add a tag in git with that version number
- Push to git origin including tags

From there the CI machine takes over and for every tagged commit the following happens

- `NPM publish` is run, this in turn will trigger our `prepack` that cleans and builds the package
- The newly minted package is published with the `next` tag. This is done to prevent `prerelease` packages from being installed by default.

### Tag "latest" on npm

To promote the new package to the `latest` tag and make it the preferred default install:

1. Log into with `npm login [username]`but if rumors are true, that could increase a lot in the future.
2. Apply the latest tag `npm dist-tag add @istreamplanet/pebble@[version number] latest`
