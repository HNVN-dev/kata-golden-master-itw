const TechnicalInterview = require("./technical-interview.js");
// const PromptSyncProvider = require("./dependencies/promptProvider/PromptSyncProvider.js");
// const ConsoleLogger = require("./dependencies/logger/ConsoleLogger.js");

function runTechnicalInterview({ logger, promptProvider, questionsProvider }) {
  const technicalWorkshop = new TechnicalInterview({
    logger,
    promptProvider,
    questionsProvider,
  });

  technicalWorkshop.addCat("SQL");
  technicalWorkshop.addCandidate("Toto", "Titi", "titi@mail.fr");

  technicalWorkshop.run("Java");
}

/* 
runTechnicalInterview({
  logger: new ConsoleLogger(),
  promptProvider: new PromptSyncProvider(),
});

process.exit();
*/

module.exports = { runTechnicalInterview };
