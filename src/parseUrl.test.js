const parseUrl = require("./parseUrl");

describe("parseUrl", () => {
    test("should correctly parse a simple URL", () => {
        const url = "https://beta.gouv.fr/stats/";

        const { baseUrl, uri } = parseUrl(url)

        expect(baseUrl).toBe("https://beta.gouv.fr");
        expect(uri).toBe("stats");
    })
})