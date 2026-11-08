# Introduction to Node.js

Build a Node.js program that starts with `npm start` and greets a person by name.

## Task

Create a project with a `start` script in `package.json`. When the program runs, it prints a line of this form:

```text
Hello <name>!
```

Resolve `<name>` in this order:

1. The value passed with `--name`.
2. The `NAME` variable from a `.env` file in the project root, when that variable is set and not empty.
3. `unknown user`, when neither source has a name.

`--name` wins over `.env`. The command-line key is `--name`; the file key is `NAME`. Any other argument, such as `--notname`, is ignored.

| Command | `.env` | Printed line |
|---|---|---|
| `npm start` | no file, or no usable `NAME` | `Hello unknown user!` |
| `npm start -- --name Anna` | any contents, or no file | `Hello Anna!` |
| `npm start` | `NAME=Anna` | `Hello Anna!` |
| `npm start -- --notname Other` | `NAME=Anna` | `Hello Anna!` |

## Run

Install [Node.js](https://nodejs.org/), which includes npm. From the project root:

```bash
npm install
npm start
npm start -- --name Anna
```

The `--` after `npm start` is required. It tells npm to forward `--name` to the program. `npm start --name Anna` does not.

To try the environment file, copy [`.env.example`](.env.example) to `.env`:

```text
NAME=User-from-dotenv
```

`.env` is listed in `.gitignore`. Leave it uncommitted. The tests remove it for each case and restore the previous file when the case finishes.

## Tests

```bash
npm install --save-dev jest
npx jest
```

GitHub Classroom runs `npm install && npm install jest`, then `npx jest`.
