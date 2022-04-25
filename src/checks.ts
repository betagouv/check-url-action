import fetch, { Response } from "node-fetch"
import { parseUrl } from "./parseUrl"

export { checks }

/**
 * Checks stats page for a given url
 */
const checks = async (url: string, { minExpectedRegex, exactExpectedRegex }: { minExpectedRegex: string | undefined, exactExpectedRegex: string | undefined }) => {
  const response = await fetch(url)
  const { baseUrl, uri } = parseUrl(url);
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
