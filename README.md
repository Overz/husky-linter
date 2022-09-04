# Husky Linter

This project have the propouse to run git hooks using `husky` and `commitlinter`

**Please follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).**

- learn git: <https://learngitbranching.js.org/>
- accepted git hooks: <https://git-scm.com/docs/githooks>
- configuration: <https://commitlint.js.org/#/reference-configuration>
  - commitlint prompting dev dependencies: <https://www.npmjs.com/package/@commitlint/cz-commitlint>
- using VSCode with edition commit mode: `git config --global core.editor "code --wait"`

---

## Usage

Example:

```text
# step 1
➜ git add .

# step 2
➜ git commit

# step 3, inside the editor, commit was following by "header" and "body"
# type(#scope): subject
feat(#123): new search filter in main page

- new filters, date, name, regex, period,
select
- controller with validations of date ranges
- regex to remove special chars in name
- multiplle select values

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# No ramo master
# Mudanças a serem submetidas:
#       modified:   src/pages/main/index.tsx
#       modified:   src/pages/main/styles.tsx
#       modified:   src/pages/main/controller.ts

# after save, all code will be validate before push, example:

Running code lint and style...
$ eslint --max-warnings=0 .
$ prettier --check './src/**/*.ts'
Checking formatting...
All matched files use Prettier code style!
Running testing and coverage...
$ jest --coverage
(node:60345) ExperimentalWarning: buffer.Blob is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  src/crypto.test.ts
  ✓ deve retornar a mensagem do erro (1 ms)
  deve realizar rotinas de criptografia e descriptografia
    ✓ deve criptografar uma string (2 ms)
    ✓ deve descriptografar uma string
  deve retornar erros se o formato da Key estiver errado ou não for a mesma
    ✓ deve lançar exceção caso o formato da Key esteja incorreto (1 ms)
    ✓ deve lançar exceção caso a Key não seja original ,pois não ira descriptografar (1 ms)

-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------|---------|----------|---------|---------|-------------------
All files  |     100 |      100 |     100 |     100 |
 crypto.ts |     100 |      100 |     100 |     100 |
-----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.084 s
Ran all test suites.
Running commit linter...
⧗   input: chore(test): teste
⚠   footer may not be empty [footer-empty]

⚠   found 0 problems, 1 warnings
ⓘ   Get help: ./docs/commit-linter.md

[master 0feb398] chore(test): teste
 1 file changed, 2 insertions(+), 1 deletion(-)
Done in 24.35s.

```

### Commit

- `git commit`
- `yarn commit`, will use prompt-cli
- `npm run commit`, will use prompt-cli

### Skip Linter & Tests

- `git commit --no-verify`

---
