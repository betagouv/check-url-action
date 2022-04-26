"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchMock = require('fetch-mock').sandbox();
fetchMock.config.overwriteRoutes = true;
const nodeFetch = require('node-fetch');
nodeFetch.default = fetchMock;
const checks_1 = require("./checks");
describe("should checks stats", () => {
    const minExpectedRegex = "^stat";
    const exactExpectedRegex = "^stats$";
    test("should return grade A with stats uri", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedJson = { "grade": "A", "url": "https://toto.beta.gouv.fr", "uri": "stats" };
        fetchMock.mock("https://toto.beta.gouv.fr/stats", expectedJson);
        const result = yield (0, checks_1.checks)("https://toto.beta.gouv.fr/stats", { minExpectedRegex, exactExpectedRegex });
        expect(result.url).toEqual("https://toto.beta.gouv.fr");
        expect(result.grade).toEqual("A");
        expect(result).toEqual(expectedJson);
    }));
    test("should return grade B with statistiques uri", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedJson = { "grade": "B", "url": "https://toto.beta.gouv.fr", "uri": "statistiques" };
        fetchMock.mock("https://toto.beta.gouv.fr/statistiques", expectedJson);
        const result = yield (0, checks_1.checks)("https://toto.beta.gouv.fr/statistiques", { minExpectedRegex, exactExpectedRegex });
        expect(result.url).toEqual("https://toto.beta.gouv.fr");
        expect(result.grade).toEqual("B");
        expect(result).toEqual(expectedJson);
    }));
    test("should return grade C with toto uri", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedJson = { "grade": "C", "url": "https://toto.beta.gouv.fr", "uri": "toto" };
        fetchMock.mock("https://toto.beta.gouv.fr/toto", expectedJson);
        const result = yield (0, checks_1.checks)("https://toto.beta.gouv.fr/toto", { minExpectedRegex, exactExpectedRegex });
        expect(result.url).toEqual("https://toto.beta.gouv.fr");
        expect(result.grade).toEqual("C");
        expect(result).toEqual(expectedJson);
    }));
    test("should return grade F otherwise", () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedJson = { "grade": "F", "url": "https://toto.beta.gouv.fr", "uri": "stats" };
        fetchMock.mock("https://toto.beta.gouv.fr/stats", 404);
        const result = yield (0, checks_1.checks)("https://toto.beta.gouv.fr/stats", { minExpectedRegex, exactExpectedRegex });
        expect(result.url).toEqual("https://toto.beta.gouv.fr");
        expect(result.grade).toEqual("F");
        expect(result).toEqual(expectedJson);
    }));
});
//# sourceMappingURL=checks.test.js.map