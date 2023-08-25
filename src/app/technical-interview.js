const POSSIBLE_ANSWERS = {
  GOOD: ["t", "T"],
  READY: "y",
};

class TechnicalWorkshop {
  constructor({ logger, promptProvider, questionsProvider }) {
    (this.logger = logger),
      (this.promptProvider = promptProvider),
      (this.questionsProvider = questionsProvider);
    this.candidate = { firstName: "", lastName: "", email: "" };
  }

  addCat(label) {
    this.logger.log(`Adding ${label} in categories`);

    this?.cat?.push(label);
  }

  addCandidate(firstName, lastName, email) {
    this.logger.log(`Adding ${firstName} as candidate`);
    this.candidate = {
      firstName,
      lastName,
      email,
    };
  }

  getCandidate() {
    return this?.candidate;
  }

  loadAllQuestions() {
    return this.questionsProvider.load();
  }

  loadQuestionsByCategory(category) {
    // TODO Extract this
    return this?.loadAllQuestions().find((q) => q.label === category).questions;
  }

  run(category) {
    const currentQuestions = this?.loadQuestionsByCategory(category);
    const registeredAnswers = [];

    this.logger.log(
      `Welcome to the interview game. You'll have ${currentQuestions.length} questions on ${category}`
    );

    const userReadyAnswer = this.promptProvider.ask(
      "Are you ready? Press y and Enter to start. ",
      "",
      {
        echo: "",
      }
    );

    if (this.isCandidateReady(userReadyAnswer)) {
      this.logger.log(`\nLet's go!\n`);
      this.logger.log("***************** Questions *****************\n");
      currentQuestions?.forEach((quest) => {
        const answer = this.promptProvider.ask(quest.label + " ", "", {});
        registeredAnswers.push({ question: quest, answer });
      });
      this.logger.log("\nThank you for your participation!\n");
    }

    this.logger.log(
      `\n***************** Response from: ${
        this.getCandidate().firstName
      } *****************\n`
    );
    let score = 0.0;
    registeredAnswers?.forEach((registeredAnswer) => {
      const question = registeredAnswer?.question;
      this.logger.log(
        `> Question: ${registeredAnswer.question.label} \n>>> Response: ${registeredAnswer.answer}. \n`
      );
      const userAnswer = this.promptProvider.ask(
        "----> What is your evaluation: t=true or f=false ? ",
        "",
        {}
      );

      if (this.isValidAnswer(userAnswer)) {
        switch (question?.difficulty) {
          case 1:
            score += 0.25;
            break;
          case 2:
            score += 0.5;
            break;
          case 3:
            score += 0.75;
            break;
          case 4:
            score += 1;
            break;
        }
      }
    });
    return score;
  }

  isCandidateReady(ready) {
    return ready === POSSIBLE_ANSWERS.READY;
  }

  isValidAnswer(answer) {
    return answer === POSSIBLE_ANSWERS.GOOD[0] || POSSIBLE_ANSWERS[1];
  }
}

module.exports = TechnicalWorkshop;
