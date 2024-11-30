// ==UserScript==
// @name        Browser back recommend disabler
// @name:ja     ブラウザバックレコメンド無効化
// @description Prevent transitions to pages that prevent site leakage displayed in the browser back.
// @match       *://*/*
// @author      hidao80
// @version     1.0.4
// @namespace   https://github.com/hidao80/UserScript/BrowserBackRecommendDisabler
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f6ab.png
// @run-at      document-end
// @grant       none
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Others/BrowserBackRecommendDisabler/BrowserBackRecommendDisabler.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Others/BrowserBackRecommendDisabler/BrowserBackRecommendDisabler.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';

/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_NAME = 'Browser back recommend disabler';
/** Suppress debug printing unless in debug mode */
const console = {};
["log","debug","warn","info","error"].forEach(method => console[m]=DEBUG?window.console[m]:function(){};
/** The script name is converted to a hexadecimal hash */
const HASH = Array.from(SCRIPT_NAME).reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0).toString(16);

console.debug(`[${SCRIPT_NAME}]: HASH = ${HASH}`);
console.debug(`[${SCRIPT_NAME}]: Script Loading...`);

/** Individual script body */
if ($._data($(window).get(0), "events")?.popstate?.length) {
    console.debug(`[${SCRIPT_NAME}]: popstate off.`);
    $(window).off("popstate");
}
