const TECHNICAL_WORKSHOP = require("./technical-interview.js");

class FakePromptProvider {
  _prompts = [];

  get args() {
    return this._prompts;
  }

  ask(prompt) {
    this._prompts.push(prompt);

    if (prompt === "Are you ready? Press y and Enter to start. ") return "y";

    return "t";
  }
}

class SpyLogger {
  _logs = [];

  get args() {
    return this._logs;
  }

  log(message) {
    this._logs.push(message);
  }
}

class ConsoleLogger {
  log(message) {
    console.log(message);
  }
}

function runTechnicalInterview({ logger, promptProvider }) {
  const technicalWorkshop = TECHNICAL_WORKSHOP({ logger, promptProvider });
  technicalWorkshop.addCat("SQL");
  technicalWorkshop.addCandidate("Toto", "Titi", "titi@mail.fr");

  const SCORE = technicalWorkshop.run("Java");
  logger.log(`The candidate as a total of ${SCORE} points.`);
}

// runTechnicalInterview({ logger: new ConsoleLogger() });
// process.exit();

module.exports = { SpyLogger, FakePromptProvider, runTechnicalInterview };
