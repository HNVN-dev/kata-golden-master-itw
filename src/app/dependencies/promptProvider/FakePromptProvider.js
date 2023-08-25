class FakePromptProvider {
  _prompts = [];
  currentPath = "Perfect";

  get args() {
    return this._prompts;
  }

  defineBadPath() {
    this.currentPath = "Bad";
  }

  simulateOnPerfectPath(prompt) {
    if (this.isReadyToStart(prompt)) return "y";

    return "t";
  }

  simulateOnBadPath(prompt) {
    if (this.isReadyToStart(prompt)) return "y";
    if (this._prompts.length > 13) {
      return "t";
    }
    return "f";
  }

  isReadyToStart(prompt) {
    return prompt === "Are you ready? Press y and Enter to start. ";
  }

  ask(prompt) {
    this._promptCounter++;
    this._prompts.push(prompt);

    if (this.currentPath === "Perfect") {
      return this.simulateOnPerfectPath(prompt);
    } else {
      return this.simulateOnBadPath(prompt);
    }
  }
}

module.exports = FakePromptProvider;
