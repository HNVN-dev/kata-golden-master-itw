class SpyLogger {
  logs = [];
  get args() {
    return this.logs;
  }
  log(message) {
    this.logs.push(message);
  }
}

module.exports = SpyLogger;
