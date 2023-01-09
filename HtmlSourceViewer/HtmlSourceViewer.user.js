// ==UserScript==
// @name        HtmlSourceViewer
// @description Displays the HTML source of the page being viewed, with syntax highlighting for non-iOS/iPadOS.
// @match       http://*/*
// @match       https://*/*
// @author      hidao80
// @version     1.2.1
// @namespace   https://github.com/hidao80/UserScript
// @licence     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4D6.pnf
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

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

if (!/^#-sv$/.test(location.hash)) return;

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
