// ==UserScript==
// @name        Misskey Different Color Local Only
// @name:ja     Misskeyだけ「ローカルのみ」の投稿範囲アイコンに違う色を付ける
// @description When the posting range is "local only" in Misskey, it should be a different color.
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.0.4
// @namespace   https://github.com/hidao80/UserScript/MisskeyDifferentColorLocalOnly
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3a8.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyDifferentColorLocalOnly/MisskeyDifferentColorLocalOnly.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Misskey/MisskeyDifferentColorLocalOnly/MisskeyDifferentColorLocalOnly.min.user.js
// ==/UserScript==
const styles=[`.popover > div:nth-child(n+5) {\n        color: var(--noteActionsReactionHover) !important;\n    }`,`div.local-only ~ footer > button.visibility > span {\n        padding: 3px;\n        border: solid 3px var(--noteActionsReactionHover);\n        border-radius: 4px;\n    }`];setTimeout((()=>{const o=[...document.styleSheets].slice(-1)[0];for(let t of styles){o.insertRule(t,o.cssRules.length)}}),500);
