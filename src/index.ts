import * as fs from "fs";
import * as core from "@actions/core";

import { checks } from "./checks";

async function run() {
  try {
    const url = core.getInput("url");
    const output = core.getInput("output");
    const exactExpectedRegex = core.getInput("exactExpectedRegex");
    const minExpectedRegex = core.getInput("minExpectedRegex");
    core.info(`Fetching page ${url}...`);
    const results = await checks(url, { exactExpectedRegex, minExpectedRegex });
    fs.writeFileSync(output, JSON.stringify(results));
  } catch (error) {
    core.setFailed((error as any).message);
  }
}

run();
