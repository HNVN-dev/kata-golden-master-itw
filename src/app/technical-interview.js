let CAN = { firstName: "" };
const CAT = [];

class TechnicalInterview {
  constructor({ logger, promptProvider, questionsProvider }) {
    (this.logger = logger),
      (this.promptProvider = promptProvider),
      (this.questionsProvider = questionsProvider);
  }

  candidate = { ...CAN };
  cat = CAT;

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

  loadQByCat(cat) {
    const CAT = this?.loadAllQuestions().find((q) => q.label === cat);
    return CAT?.questions;
  }

  run(category) {
    const Q = this?.loadQByCat(category);
    const R = [];

    this.logger.log(
      `Welcome to the interview game. You'll have ${Q?.length} questions on ${category}`
    );

    const ready = this.promptProvider.ask(
      "Are you ready? Press y and Enter to start. ",
      "",
      {
        echo: "",
      }
    );
    if (ready === "y") {
      this.logger.log(`\nLet's go!\n`);
      this.logger.log("***************** Questions *****************\n");
      Q?.forEach((quest) => {
        const a = this.promptProvider.ask(quest.label + " ", "", {});
        R.push({ question: quest, answer: a });
      });
      this.logger.log("\nThank you for your participation!\n");
    }
    this.logger.log(
      `\n***************** Response from: ${
        this.getCandidate().firstName
      } *****************\n`
    );
    let s = 0.0;
    R?.forEach((r) => {
      const q = r?.question;
      this.logger.log(
        `> Question: ${r.question.label} \n>>> Response: ${r.answer}. \n`
      );
      const A = this.promptProvider.ask(
        "----> What is your evaluation: t=true or f=false ? ",
        "",
        {}
      );
      if (A === "t" || A === "T") {
        switch (q?.difficulty) {
          case 1:
            s += 0.25;
            break;
          case 2:
            s += 0.5;
            break;
          case 3:
            s += 0.75;
            break;
          case 4:
            s += 1;
            break;
        }
      }
    });
    return s;
  }
}

module.exports = TechnicalInterview;
