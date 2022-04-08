const { default: fetch } = require("node-fetch");

class HTTPResponseError extends Error {
  constructor(response, ...args) {
    super(
      `HTTP Error Response: ${response.status} ${response.statusText}`,
      ...args
    );
  }
}

const checkStatus = (url, uri, response) => {
  var grade = "F";
  if (response.ok) {
    if (uri == "stats") { 
      grade = "A";
    } else if (uri.startsWith("stat")) {
      grade = "B";
    } else {
      grade = "F";
    }
  } else if (response.status < 500) {
    grade = "F";
  } else {
    throw new HTTPResponseError(response);
  }
  return {grade: grade, url: url, uri: uri};
};

/**
 * Checks stats page for a given url
 *
 * @param {string} url The url checked
 * @param {string} uri The uri stats page checked
 *
 * @returns {Promise<HttpScanResult>}
 */
const checks = (url, uri) => {
  const statsUrl = encodeURI(`${url}/${uri}`);
  return fetch(statsUrl)
    .then((response) => checkStatus(url, uri, response));
};

module.exports = checks;
