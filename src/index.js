const fs = require("fs");
const core = require("@actions/core");

const checks = require("./checks");

async function run() {
  try {
    const url = core.getInput("url");
    const uri = core.getInput("uri");
    const output = core.getInput("output");
    core.info(`Fetching page ${url}/${uri} ...`);
    const results = await checks(url, uri);
    fs.writeFileSync(output, JSON.stringify(results));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();