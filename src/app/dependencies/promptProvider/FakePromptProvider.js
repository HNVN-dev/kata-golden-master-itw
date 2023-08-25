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

module.exports = FakePromptProvider;
