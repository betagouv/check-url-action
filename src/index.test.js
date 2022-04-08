const fetchMock = require('fetch-mock').sandbox();
fetchMock.config.overwriteRoutes = true;
const nodeFetch = require('node-fetch');
nodeFetch.default = fetchMock;

const checks = require("./checks");

describe("should checks stats", () => {
  test("should return grade A with stats uri", async () => {
    const expectedJson = {"grade":"A","url":"https://toto.beta.gouv.fr", "uri": "stats"};
    fetchMock.mock("https://toto.beta.gouv.fr/stats", expectedJson);
    const result = await checks("https://toto.beta.gouv.fr", "stats");
    expect(result.url).toEqual("https://toto.beta.gouv.fr");
    expect(result.grade).toEqual("A");
    expect(result).toEqual(expectedJson);
  });

  test("should return grade B with statistiques uri", async () => {
    const expectedJson = {"grade":"B","url":"https://toto.beta.gouv.fr", "uri": "statistiques"};
    fetchMock.mock("https://toto.beta.gouv.fr/statistiques", expectedJson);
    const result = await checks("https://toto.beta.gouv.fr", "statistiques");
    expect(result.url).toEqual("https://toto.beta.gouv.fr");
    expect(result.grade).toEqual("B");
    expect(result).toEqual(expectedJson);
  });

  test("should return grade F with toto uri", async () => {
    const expectedJson = {"grade":"F","url":"https://toto.beta.gouv.fr", "uri": "toto"};
    fetchMock.mock("https://toto.beta.gouv.fr/toto", expectedJson);
    const result = await checks("https://toto.beta.gouv.fr", "toto");
    expect(result.url).toEqual("https://toto.beta.gouv.fr");
    expect(result.grade).toEqual("F");
    expect(result).toEqual(expectedJson);
  });

  test("should return grade F otherwise", async () => {
    const expectedJson = {"grade":"F","url":"https://toto.beta.gouv.fr", "uri": "stats"};
    fetchMock.mock("https://toto.beta.gouv.fr/stats", 404);
    const result = await checks("https://toto.beta.gouv.fr", "stats");
    expect(result.url).toEqual("https://toto.beta.gouv.fr");
    expect(result.grade).toEqual("F");
    expect(result).toEqual(expectedJson);
  });
});
