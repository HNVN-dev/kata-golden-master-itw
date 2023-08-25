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
  }

  addCandidate(firstName, lastName, email) {
    this.logger.log(`Adding ${firstName} as candidate`);
    this.candidate = {
      firstName,
      lastName,
      email,
    };
  }

  loadQuestionsByCategory(category) {
    return this.questionsProvider.loadByCategory(category);
  }

  run(category) {
    const currentQuestions = this.loadQuestionsByCategory(category);
    const registeredUserAnswers = [];

    this.logger.log(
      `Welcome to the interview game. You'll have ${this.totalQuestions(
        currentQuestions
      )} questions on ${category}`
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

      this.startInterview(currentQuestions, registeredUserAnswers);

      this.logger.log("\nThank you for your participation!\n");
    }

    this.logger.log(
      `\n***************** Response from: ${this.candidate.firstName} *****************\n`
    );

    this.visualizeTotalScore(registeredUserAnswers);
  }

  visualizeTotalScore(R) {
    const totalScore = this.totalScore(R);
    this.logger.log(`The candidate as a total of ${totalScore} points.`);
  }

  startInterview(currentQuestions, registeredUserAnswers) {
    currentQuestions?.forEach((currentQuestion) => {
      const answer = this.askQuestion(currentQuestion, registeredUserAnswers);
      this.registerUserAnswer(registeredUserAnswers, currentQuestion, answer);
    });
  }

  registerUserAnswer(registeredUserAnswers, question, answer) {
    registeredUserAnswers.push({ question, answer });
  }

  askQuestion(quest) {
    return this.promptProvider.ask(quest.label + " ", "", {});
  }

  totalScore(forUserAnswers) {
    const score = 0;
    return forUserAnswers.reduce((score, answer) => {
      const currentQuestion = answer.question;
      this.logger.log(
        `> Question: ${answer.question.label} \n>>> Response: ${answer.answer}. \n`
      );
      const userAnswer = this.promptProvider.ask(
        "----> What is your evaluation: t=true or f=false ? ",
        "",
        {}
      );
      if (this.isValidAnswer(userAnswer)) {
        return this.validateScore(currentQuestion, score);
      }
    }, score);
  }

  validateScore(currentQuestion, score) {
    switch (currentQuestion.difficulty) {
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
    return score;
  }

  totalQuestions(currentQuestions) {
    return currentQuestions.length;
  }

  candidateFirstName() {
    return this.candidate.firstName;
  }

  isCandidateReady(ready) {
    return ready === POSSIBLE_ANSWERS.READY;
  }

  isValidAnswer(answer) {
    return answer === POSSIBLE_ANSWERS.GOOD[0] || POSSIBLE_ANSWERS[1];
  }
}

module.exports = TechnicalWorkshop;
