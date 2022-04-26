"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrl = void 0;
function parseUrl(url) {
    const parsedUrl = new URL(url);
    let uri = parsedUrl.pathname;
    if (uri[0] === "/") {
        uri = uri.substring(1);
    }
    if (uri[uri.length - 1] === "/") {
        uri = uri.substring(0, uri.length - 1);
    }
    return { baseUrl: parsedUrl.origin, uri };
}
exports.parseUrl = parseUrl;
//# sourceMappingURL=parseUrl.js.map