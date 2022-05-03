import fetch, { Response } from "node-fetch"
import * as core from "@actions/core"
import { parseUrl } from "./parseUrl"

export { checks }

/**
 * Checks stats page for a given url
 */
const checks = async (url: string | null, { minExpectedRegex, exactExpectedRegex }: { minExpectedRegex: string | undefined, exactExpectedRegex: string | undefined }) => {
  if (!url) {
    return { grade: "F", url: "", uri: "" }
  }
  let baseUrl = "", uri = "", response;
  try {
    const parsedUrl = parseUrl(url);
    baseUrl = parsedUrl.baseUrl;
    uri = parsedUrl.uri;
    response = await fetch(url);
  } catch (error) {
    core.error(`Error while trying to parse URL ${url}: ${error}`)
    return { grade: "F", url, uri: "" }
  }

  return checkStatus(response);


  function checkStatus(response: Response) {
    const grade = getGrade()

    return { grade, url: baseUrl, uri };

    function getGrade() {
      if (response.ok) {
        if (!exactExpectedRegex || uri.match(new RegExp(exactExpectedRegex))) {
          return "A";
        } else if (!minExpectedRegex || uri.match(new RegExp(minExpectedRegex))) {
          return "B";
        } else {
          return "C";
        }
      } else if (response.status < 500) {
        return "F";
      } else {
        throw new Error(`HTTP Error Response: ${response.status} ${response.statusText}`);
      }
    }
  }
};
