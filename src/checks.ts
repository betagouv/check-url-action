import fetch, { Response } from "node-fetch";
import * as core from "@actions/core";
import { parseUrl } from "./parseUrl";

export { checks };

/**
 * Checks stats page for a given url
 */
const checks = async (
  url: string | null,
  {
    minExpectedRegex,
    exactExpectedRegex,
  }: {
    minExpectedRegex: string | undefined;
    exactExpectedRegex: string | undefined;
  }
) => {
  if (!url || url == "null") {
    return { grade: "F", url: "", uri: "" };
  }
  let baseUrl = "",
    uri = "";
  try {
    const parsedUrl = parseUrl(url);
    baseUrl = parsedUrl.baseUrl;
    uri = parsedUrl.uri;
  } catch (error) {
    core.error(`Error while trying to parse URL ${url}: ${error}`);
    return { grade: "F", url, uri: "" };
  }

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  return checkStatus(response);

  function checkStatus(response: Response) {
    const grade = getGrade();

    return { grade, url: baseUrl, uri };

    function getGrade() {
      if (response.ok) {
        if (!exactExpectedRegex || uri.match(new RegExp(exactExpectedRegex))) {
          return "A";
        } else if (
          !minExpectedRegex ||
          uri.match(new RegExp(minExpectedRegex))
        ) {
          return "B";
        } else {
          return "C";
        }
      } else if (response.status < 500) {
        return "F";
      } else {
        throw new Error(
          `HTTP Error Response: ${response.status} ${response.statusText}`
        );
      }
    }
  }
};
