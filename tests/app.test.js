const { execSync } = require("child_process");
const fs = require("fs");

const ENV_PATH = ".env";

function runApp(args) {
  const command = args ? `npm start -- ${args}` : "npm start";
  return execSync(command, { encoding: "utf8" });
}

describe("app", () => {
  let savedEnv = null;

  beforeEach(() => {
    savedEnv = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH) : null;
    if (savedEnv !== null) {
      fs.unlinkSync(ENV_PATH);
    }
  });

  afterEach(() => {
    if (fs.existsSync(ENV_PATH)) {
      fs.unlinkSync(ENV_PATH);
    }
    if (savedEnv !== null) {
      fs.writeFileSync(ENV_PATH, savedEnv);
    }
  });

  it.each([
    [
      'prints "Hello unknown user!" when --name and .env are missing',
      null,
      "",
      "Hello unknown user!",
    ],
    [
      'prints "Hello User-from-parameters!" when --name is set',
      null,
      "--name User-from-parameters",
      "Hello User-from-parameters!",
    ],
    [
      'prints "Hello User-from-dotenv!" when only .env has NAME',
      "NAME=User-from-dotenv",
      "",
      "Hello User-from-dotenv!",
    ],
    [
      "prefers --name over NAME from .env",
      "NAME=User-from-dotenv",
      "--name User-from-parameters",
      "Hello User-from-parameters!",
    ],
    [
      "ignores --notname and uses NAME from .env",
      "NAME=User-from-dotenv2",
      "--notname User-from-parameters",
      "Hello User-from-dotenv2!",
    ],
    [
      'prints "Hello unknown user!" when only --notname is set',
      null,
      "--notname User-from-parameters",
      "Hello unknown user!",
    ],
    [
      "uses --name when --notname is also present",
      null,
      "--notname User-from-parameters --name User-from-parameters2",
      "Hello User-from-parameters2!",
    ],
    [
      'prints "Hello unknown user!" when .env exists without NAME',
      "OTHER=value",
      "",
      "Hello unknown user!",
    ],
    [
      'prints "Hello unknown user!" when NAME is empty',
      "NAME=",
      "",
      "Hello unknown user!",
    ],
  ])("%s", (_title, env, args, expected) => {
    if (env !== null) {
      fs.writeFileSync(ENV_PATH, env);
    }

    expect(runApp(args)).toContain(expected);
  });
});
