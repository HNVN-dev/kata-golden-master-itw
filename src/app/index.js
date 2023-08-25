const TechnicalInterview = require("./technical-interview.js");
const PromptSyncProvider = require("./dependencies/promptProvider/PromptSyncProvider.js");
const ConsoleLogger = require("./dependencies/logger/ConsoleLogger.js");
const JsonQuestionsProvider = require("./dependencies/questionsProvider/JsonQuestionsProvider.js");

function runTechnicalInterview({ logger, promptProvider, questionsProvider }) {
  const technicalWorkshop = new TechnicalInterview({
    logger,
    promptProvider,
    questionsProvider,
  });

  technicalWorkshop.addCat("SQL");
  technicalWorkshop.addCandidate({
    firstName: "Toto",
    lastName: "Titi",
    email: "titi@mail.fr",
  });

  technicalWorkshop.run("Java");
}

/* runTechnicalInterview({
  questionsProvider: new JsonQuestionsProvider(),
  logger: new ConsoleLogger(),
  promptProvider: new PromptSyncProvider(),
});

process.exit(); */

module.exports = { runTechnicalInterview };
