/*
 *  Licence: MIT
 *
 *  Copyright 2022 hidao80
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// ==UserScript==
// @name        MastodonTimeToAbsolute
// @description Change time to absolute notation bookmarklet for Mastodon.
// @match       https://fedibird.com/web/*
// @match       https://fedibird.com/web/*/timelines/*
// @author      hidao80
// @version     1.0
// @run-at      document-idle
// @updateURL   https://github.com/hidao80/UserScript/raw/main/MastodonTimeToAbsolute/MastodonTimeToAbsolute.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/MastodonTimeToAbsolute/MastodonTimeToAbsolute.user.js
// ==/UserScript==

// const sheet = new CSSStyleSheet();
// sheet.replaceSync(`
// article time::before {
//     content: attr(title) " (";
// }
// article time::after {
//     content: ")";
// }`);
// document.adoptedStyleSheets = document.adoptedStyleSheets.concat(sheet);

const usableSheet = [...document.styleSheets].filter(x => x.href?.startsWith(location.origin)).slice(-1)[0];
usableSheet.insertRule(`
article time::before {
    content: attr(title) " (";
}`, usableSheet.cssRules.length);
usableSheet.insertRule(`
article time::after {
    content: ")";
}`, usableSheet.cssRules.length);
