const {
  FakePromptProvider,
  SpyLogger,
  runTechnicalInterview,
} = require("./index");
describe("The technical workshop test harness", () => {
  const logger = new SpyLogger();
  const promptProvider = new FakePromptProvider();
  it("should golden master", () => {
    runTechnicalInterview({
      logger,
      promptProvider,
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
});
