const fs = require("fs");
const core = require("@actions/core");

const checks = require("./checks");

async function run() {
  try {
    const baseUrl = core.getInput("baseUrl");
    const uri = core.getInput("uri");
    const output = core.getInput("output");
    const exactExpectedRegex = core.getInput("exactExpectedRegex")
    const minExpectedRegex = core.getInput("minExpectedRegex")
    core.info(`Fetching page ${baseUrl}/${uri}...`);
    const results = await checks(baseUrl, uri, { exactExpectedRegex, minExpectedRegex });
    fs.writeFileSync(output, JSON.stringify(results));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();