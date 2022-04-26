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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checks = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const parseUrl_1 = require("./parseUrl");
/**
 * Checks stats page for a given url
 */
const checks = (url, { minExpectedRegex, exactExpectedRegex }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, node_fetch_1.default)(url);
    const { baseUrl, uri } = (0, parseUrl_1.parseUrl)(url);
    return checkStatus(response);
    function checkStatus(response) {
        const grade = getGrade();
        return { grade, url: baseUrl, uri };
        function getGrade() {
            if (response.ok) {
                if (!exactExpectedRegex || uri.match(new RegExp(exactExpectedRegex))) {
                    return "A";
                }
                else if (!minExpectedRegex || uri.match(new RegExp(minExpectedRegex))) {
                    return "B";
                }
                else {
                    return "C";
                }
            }
            else if (response.status < 500) {
                return "F";
            }
            else {
                throw new Error(`HTTP Error Response: ${response.status} ${response.statusText}`);
            }
        }
    }
});
exports.checks = checks;
//# sourceMappingURL=checks.js.map