// @license     MIT// ==UserScript==
// @name        Browser back recommend disabler
// @name:ja     ブラウザバックレコメンド無効化
// @description Prevent transitions to pages that prevent site leakage displayed in the browser back.
// @match       *://*/*
// @author      hidao80
// @version     1.0.8
// @namespace   https://github.com/hidao80/UserScript/BrowserBackRecommendDisabler
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f6ab.png
// @run-at      document-end
// @grant       none
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Others/BrowserBackRecommendDisabler/BrowserBackRecommendDisabler.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Others/BrowserBackRecommendDisabler/BrowserBackRecommendDisabler.min.user.js
// ==/UserScript==
(async()=>{const o=false;const e="Browser back recommend disabler";const t={};["log","debug","warn","info","error"].forEach((e=>t[e]=o?window.console[e]:function(){}));const n=Array.from(e).reduce(((o,e)=>(o<<5)-o+e.charCodeAt(0)),0).toString(16);t.debug(`[${e}]: HASH = ${n}`);t.debug(`[${e}]: Script Loading...`);if($._data($(window).get(0),"events")?.popstate?.length){t.debug(`[${e}]: popstate off.`);$(window).off("popstate")}})();
