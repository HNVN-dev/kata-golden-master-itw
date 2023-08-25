const questions = require("../../../data/categories.json");

class JsonQuestionsProvider {
  load() {
    return [...questions];
  }
}

module.exports = JsonQuestionsProvider;
