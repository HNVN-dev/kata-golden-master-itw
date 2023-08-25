const promptSync = require("prompt-sync");
const prompt = promptSync({});

class PromptSyncProvider {
  ask(message) {
    return prompt(message);
  }
}

module.exports = PromptSyncProvider;
