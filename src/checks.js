const { default: fetch } = require("node-fetch");

class HTTPResponseError extends Error {
  constructor(response, ...args) {
    super(
      `HTTP Error Response: ${response.status} ${response.statusText}`,
      ...args
    );
  }
}

/**
 * Checks stats page for a given url
 *
 * @param {string} url The url checked
 * @param {string} uri The uri of the page checked
 * @param {string} minExpectedRegex The minimum regex to match to have a good grade 
 * @param {string} exactExpectedRegex The regex to match to have the best grade 
 *
 * @returns {Promise<HttpScanResult>}
 */
const checks = async (baseUrl, uri, { minExpectedRegex, exactExpectedRegex }) => {
  const url = encodeURI(`${baseUrl}/${uri}`);
  const response = await fetch(url)
  return checkStatus(response);


  function checkStatus(response) {
    const grade = getGrade(response)

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
        throw new HTTPResponseError(response);
      }
    }
  }

};

module.exports = checks;
