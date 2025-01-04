# Toolchains

Generate a command line interface for local scripts.

![Review](https://img.shields.io/github/actions/workflow/status/JoelLefkowitz/toolchains/review.yaml)
![Version](https://img.shields.io/npm/v/toolchains)
![Downloads](https://img.shields.io/npm/dw/toolchains)
![Size](https://img.shields.io/bundlephobia/min/toolchains)
![Quality](https://img.shields.io/codacy/grade/8fd441672bfe400581ef07dfb59eda5c)
![Coverage](https://img.shields.io/codacy/coverage/8fd441672bfe400581ef07dfb59eda5c)

## Motivation

Often projects have local scripts:

```txt
scripts
  └── lint.ts
```

This package generates a command line interface for them:

```
toolchains <command>

Commands:
  toolchains lint    Run linters

Options:
  -p, --path     Set the search path                        [default: "scripts"]
  -i, --include  Set the include pattern                       [default: "*.ts"]
  -d, --debug    Enable debug logging                                  [boolean]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

The scripts can be written in TypeScript:

```ts
export default {
  name: "lint",
  description: "Run linters",
  action: () => {
    console.log("Running linters...");
  },
};
```

Then the command line interface can be invoked:

```bash
toolchains lint
```

```txt
Running linters...
```

## Installing

```bash
npm install toolchains
```

## Documentation

Documentation and more detailed examples are hosted on [Github Pages](https://joellefkowitz.github.io/toolchains).

## Usage

You can use named exports for the `name`, `description` and `action`:

```ts
export const name = "example";

export const description = "Does nothing";

export const action = () => {
  console.log("Running");
};
```

You can also default export a function on its own:

```ts
export default function () {
  console.log("Running");
}
```

### Transpilation

To parse TypeScript files `tsc` is invoked in a temporary directory. Unfortunately `ts-node` does not allow you to consume the parsed module contents and dynamic imports won't accept typescript syntax without transpilation first.

### Options

- `--path` - Set the search path
- `--include` - Set the include pattern

## Tooling

### Dependencies

To install dependencies:

```bash
yarn install
```

### Tests

To run tests:

```bash
yarn test
```

### Documentation

To generate the documentation locally:

```bash
yarn docs
```

### Linters

To run linters:

```bash
yarn lint
```

### Formatters

To run formatters:

```bash
yarn format
```

## Contributing

Please read this repository's [Code of Conduct](CODE_OF_CONDUCT.md) which outlines our collaboration standards and the [Changelog](CHANGELOG.md) for details on breaking changes that have been made.

This repository adheres to semantic versioning standards. For more information on semantic versioning visit [SemVer](https://semver.org).

Bump2version is used to version and tag changes. For example:

```bash
bump2version patch
```

### Contributors

- [Joel Lefkowitz](https://github.com/joellefkowitz) - Initial work

## Remarks

Lots of love to the open source community!

<div align='center'>
    <img width=200 height=200 src='https://media.giphy.com/media/osAcIGTSyeovPq6Xph/giphy.gif' alt='Be kind to your mind' />
    <img width=200 height=200 src='https://media.giphy.com/media/KEAAbQ5clGWJwuJuZB/giphy.gif' alt='Love each other' />
    <img width=200 height=200 src='https://media.giphy.com/media/WRWykrFkxJA6JJuTvc/giphy.gif' alt="It's ok to have a bad day" />
</div>
