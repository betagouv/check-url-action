"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const core = __importStar(require("@actions/core"));
const parseUrl_1 = require("./parseUrl");
/**
 * Checks stats page for a given url
 */
const checks = (url, { minExpectedRegex, exactExpectedRegex }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!url) {
        return { grade: "F", url: "", uri: "" };
    }
    let baseUrl = "", uri = "", response;
    try {
        const parsedUrl = (0, parseUrl_1.parseUrl)(url);
        baseUrl = parsedUrl.baseUrl;
        uri = parsedUrl.uri;
    }
    catch (error) {
        core.error(`Error while trying to parse URL ${url}: ${error}`);
        return { grade: "F", url, uri: "" };
    }
    response = yield (0, node_fetch_1.default)(url);
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