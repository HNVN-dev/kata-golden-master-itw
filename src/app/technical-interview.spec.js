const { runTechnicalInterview } = require("./index");
const SpyLogger = require("./dependencies/Logger/SpyLogger");
const FakePromptProvider = require("./dependencies/promptProvider/FakePromptProvider");
const JsonQuestionsProvider = require("./dependencies/questionsProvider/JsonQuestionsProvider");

describe("The technical workshop test harness", () => {
  let logger;
  let promptProvider;
  const questionsProvider = new JsonQuestionsProvider();

  beforeEach(() => {
    logger = new SpyLogger();
    promptProvider = new FakePromptProvider();
  });

  it("should display the same logs and prompts given Java category and perfect course", () => {
    runTechnicalInterview({
      logger,
      promptProvider,
      questionsProvider,
    });

    expect(logger.args).toStrictEqual([
      "Adding SQL in categories",
      "Adding Toto as candidate",
      "Welcome to the interview game. You'll have 8 questions on Java",
      "\nLet's go!\n",
      "***************** Questions *****************\n",
      "\nThank you for your participation!\n",
      "\n***************** Response from: Toto *****************\n",
      "> Question: Can a constructor be Private ? \n>>> Response: t. \n",
      "> Question: What is JIT ? \n>>> Response: t. \n",
      "> Question: What are the new Java 8 features ? \n>>> Response: t. \n",
      "> Question: How can a garbage collection be triggered ? \n" +
        ">>> Response: t. \n",
      "> Question: What is an anonymous class ? \n>>> Response: t. \n",
      "> Question: What is a RuntimeException ? \n>>> Response: t. \n",
      "> Question: What is a HashMap ? \n>>> Response: t. \n",
      "> Question: Can one interface extend another interface ? \n" +
        ">>> Response: t. \n",
      "The candidate as a total of 5 points.",
    ]);

    expect(promptProvider.args).toStrictEqual([
      "Are you ready? Press y and Enter to start. ",
      "Can a constructor be Private ? ",
      "What is JIT ? ",
      "What are the new Java 8 features ? ",
      "How can a garbage collection be triggered ? ",
      "What is an anonymous class ? ",
      "What is a RuntimeException ? ",
      "What is a HashMap ? ",
      "Can one interface extend another interface ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
    ]);
  });

  it("should display the same logs and prompts given Java category and bad score performance", () => {
    promptProvider.defineBadPath();

    runTechnicalInterview({
      logger,
      promptProvider,
      questionsProvider,
    });
    expect(logger.args).toStrictEqual([
      "Adding SQL in categories",
      "Adding Toto as candidate",
      "Welcome to the interview game. You'll have 8 questions on Java",
      "\nLet's go!\n",
      "***************** Questions *****************\n",
      "\nThank you for your participation!\n",
      "\n***************** Response from: Toto *****************\n",
      "> Question: Can a constructor be Private ? \n>>> Response: f. \n",
      "> Question: What is JIT ? \n>>> Response: f. \n",
      "> Question: What are the new Java 8 features ? \n>>> Response: f. \n",
      "> Question: How can a garbage collection be triggered ? \n" +
        ">>> Response: f. \n",
      "> Question: What is an anonymous class ? \n>>> Response: f. \n",
      "> Question: What is a RuntimeException ? \n>>> Response: f. \n",
      "> Question: What is a HashMap ? \n>>> Response: f. \n",
      "> Question: Can one interface extend another interface ? \n" +
        ">>> Response: f. \n",
      "The candidate as a total of 1.75 points.",
    ]);

    expect(promptProvider.args).toStrictEqual([
      "Are you ready? Press y and Enter to start. ",
      "Can a constructor be Private ? ",
      "What is JIT ? ",
      "What are the new Java 8 features ? ",
      "How can a garbage collection be triggered ? ",
      "What is an anonymous class ? ",
      "What is a RuntimeException ? ",
      "What is a HashMap ? ",
      "Can one interface extend another interface ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
      "----> What is your evaluation: t=true or f=false ? ",
    ]);
  });
});
