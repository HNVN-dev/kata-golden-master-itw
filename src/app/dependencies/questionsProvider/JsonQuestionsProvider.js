const questions = require("../../../data/categories.json");

class JsonQuestionsProvider {
  load() {
    return [...questions];
  }

  loadByCategory(category) {
    return this?.load().find((q) => q.label === category).questions;
  }
}

module.exports = JsonQuestionsProvider;
