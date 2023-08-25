const TECHNICAL_WORKSHOP = require("./technical-interview.js");
const PromptSyncProvider = require("./dependencies/promptProvider/PromptSyncProvider.js");
const ConsoleLogger = require("./dependencies/logger/ConsoleLogger.js");

function runTechnicalInterview({ logger, promptProvider, questionsProvider }) {
  const technicalWorkshop = TECHNICAL_WORKSHOP({
    logger,
    promptProvider,
    questionsProvider,
  });
  technicalWorkshop.addCat("SQL");
  technicalWorkshop.addCandidate("Toto", "Titi", "titi@mail.fr");

  const SCORE = technicalWorkshop.run("Java");
  logger.log(`The candidate as a total of ${SCORE} points.`);
}

/* 
runTechnicalInterview({
  logger: new ConsoleLogger(),
  promptProvider: new PromptSyncProvider(),
});

process.exit();
*/

module.exports = { runTechnicalInterview };
