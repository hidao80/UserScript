/*
Licence: MIT

Copyright 2022 hidao80

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// ==UserScript==
// @name        HtmlSourceViewer
// @description Displays the HTML source of the page being displayed.
// @match       http://*
// @match       https://*
// @author      hidao80
// @version     1.0
// @namespace   hidao80
// @run-at      document-end
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @resource    shCore.ssh https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/styles/shCore.min.css#sha512-q9B+BRcW0p2dRy94K1it1sy2Dv9UkAqIYoAUcWQY7Pis6fcQSAe5lohmJiymUL5glkr+Gu8fEVW6UjNKz6qm3A==
// @resource    shCoreDefault.css https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/styles/shCoreDefault.min.css#sha512-m86ay46+VXJi/u/ARTNMtfjIXdW6ht5LULFIK1GvPRobUlQgRdZTs7f105BDB8pzFCxk/6nq5otE9j12Onkyow==
// @require     https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/scripts/shCore.min.js#sha512-Z5dAQyvO8EyY1cHQcqYTYL8z6PDjM0URql6AioNodsSxxTJS5Fqfujr+o/4ye2dLp0he1qAVTiZABTunv6oLow==
// @require     https://cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/scripts/shBrushXml.min.js#sha512-XHSgk11LDMG/R4L6Tn9cl4xbwbO5dnsgJrtXd/oT6KVf00wqAog2wY8j3kySxmxRoiBAxON5lZZW9fqHj2CE7g==
// @updateURL   https://github.com/hidao80/UserScript/raw/main/HtmlSourceViewer/HtmlSourceViewer.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/HtmlSourceViewer/HtmlSourceViewer.user.js
// ==/UserScript==

if (!/#hsv/.test(location.hash)) return;

// Fixed a bug that caused tags to be hidden.
const html = document.getElementsByTagName('HTML')[0].outerHTML.replace(/</g, "&lt;");
document.body.innerHTML = `<pre class="brush: xml;toolbar: false;">${html}</pre>`;

try {
    // If local files are available, syntax highlighting will be applied.
    // Currently not supported by iOS/iPadOS
    GM_addStyle(GM_getResourceText("shCore.css"));
    GM_addStyle(GM_getResourceText("shCoreDefault.css"));

    SyntaxHighlighter.config.bloggerMode = true;
    SyntaxHighlighter.all()
} catch (ex) {
}
