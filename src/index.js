const fs = require("fs");
const core = require("@actions/core");

const checks = require("./checks");

async function run() {
  try {
    const url = core.getInput("url");
    const output = core.getInput("output");
    const exactExpectedRegex = core.getInput("exactExpectedRegex")
    const minExpectedRegex = core.getInput("minExpectedRegex")
    core.info(`Fetching page ${url}...`);
    const results = await checks(url, { exactExpectedRegex, minExpectedRegex });
    fs.writeFileSync(output, JSON.stringify(results));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();