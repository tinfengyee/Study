function initialize(options) {
  if (options.enabled) {
    console.log(`Logger plugin initialized with priority ${options.priority}`);
  }
}

module.exports = initialize;