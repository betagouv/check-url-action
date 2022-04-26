"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseUrl_1 = require("./parseUrl");
describe("parseUrl", () => {
    test("should correctly parse a simple URL", () => {
        const url = "https://beta.gouv.fr/stats/";
        const { baseUrl, uri } = (0, parseUrl_1.parseUrl)(url);
        expect(baseUrl).toBe("https://beta.gouv.fr");
        expect(uri).toBe("stats");
    });
});
//# sourceMappingURL=parseUrl.test.js.map