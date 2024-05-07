# leanpub

Limitations:

- Sorting is the natural order of the files, so:

```
docs/00-index.mdx         # works, comes first
docs/01-part1/00-index.md # works
docs/index.mdx            # doesn't work, comes too late
```

Basic script to test the validity of names of E2E suites and steps, as well as provide some metrics on reports. Can also be used in CI to fail PRs that do not have valid test names.

**This is a script** - it's not production grade code, it's for quick diagnostics and CI processes. It does not have tests, adhere to standard linting patterns and so on. If we want to industrialise this, we should extract it into it's own repo, module, and put a CLI around it.

## Quickstart

Run the script, providing the path to the test files:

From the `Lingo` folder run:

```bash
npm run e2e-test-report
```

Or manually run the script, providing the path to the test files:

```bash
node report.js "../tests/specs"
# debug with...
node --inspect --inspect-brk report.js "../tests/specs"
```

This will:

1. Recursively find all files matching the pattern `*.spec.ts`
2. Go through each file and validate top-level `describe` calls to ensure that they match the test name requirements
3. Go through each file and validate the `it` calls to ensure that they match the step name requirements
4. Write a report to `report.csv` for quick analysis
5. Write a summary to the console for quick review
6. Exit wit a non-zero code if any tests or steps do not match the requirements

## Test and Step Requirements

- `\d+_RN\:\d+` - tests have a requirement number and protocol id
- `^Step\s?[\d\.]+` steps are clearly named and numbered

## CSV Report output

The follow columns are written:

| Column        | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| Path          | The path to the test file                                     |
| ValidProtocol | TRUE if the test name correctly links to a protocol           |
| ValidSteps    | TRUE if the names of the steps in the test are named properly |
| NumberOfSteps | The number of steps in the test                               |
| Name          | The actual name of the test                                   |

## Developer Guide

Format the code with:

```bash
npx prettier --write
```

Run tests with:

```bash
npx jest *.spec.js
```

Test the build pipeline with:

```bash
act -s NPM_AUTH -s NPM_USER_EMAIL -W .github/workflows/ci.yml
```

See "Testing Pipelines" in the developer guide for how to setup `act`.
