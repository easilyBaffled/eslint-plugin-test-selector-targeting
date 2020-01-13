# eslint-plugin-test-selector-targeting

Ensure Good E2E Targets

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-test-selector-targeting`:

```
$ npm install eslint-plugin-test-selector-targeting --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-test-selector-targeting` globally.

## Usage

Add `test-selector-targeting` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["test-selector-targeting"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "test-selector-targeting/rule-name": 2
  }
}
```

## Supported Rules

- Fill in provided rules here
