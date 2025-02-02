// my-plugin-analytics.js
function initialize(options) {
  if (options.enabled) {
    console.log(`Analytics plugin initialized with priority ${options.priority}`);
  }
}

module.exports = initialize;