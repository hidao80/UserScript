// @license     MIT// ==UserScript==
// @name        Back to top for Misskey v11
// @name:ja     Misskey v11向け先頭に戻るボタン追加
// @description Summary of this script
// @match       https://misskey.dev/*
// @author      hidao80
// @version     1.3.1
// @namespace   https://github.com/hidao80/UserScript/MisskeyV11BackToTop
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2b06.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/MisskeyV11BackToTop/MisskeyV11BackToTop.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/MisskeyV11BackToTop/MisskeyV11BackToTop.min.user.js
// ==/UserScript==
(async()=>{const e=false;const t="us-hidao80-MisskeyV11BackToTop";const o="MisskeyV11BackToTop";e&&console.debug(`[${o}]: script started.`);if(JSON.parse(localStorage.getItem("vuex")).device.deckMode){return}const n="home_timeline_top";const r=document.createElement("a");r.classList.add(t,"pagetop");r.href="#"+n;const s=document.createElement("div");s.classList.add(t,"pagetop__arrow");const i=JSON.parse(localStorage.getItem("theme"));const a=[`.content.top {\n        scroll-behavior: smooth;\n        padding-top: 4em;\n        margin-top: -4em;\n    }`,`div.tl {\n        scroll-behavior: smooth;\n        padding-top: 4em;\n        margin-top: -4em;\n    }`,`.${t}.pagetop {\n        height: 50px;\n        width: 50px;\n        position: fixed;\n        right: 30px;\n        bottom: 30px;\n        background: ${i.primary};\n        border-radius: 50%;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        z-index: 1030;\n    }`,`.${t}.pagetop__arrow {\n        height: 10px;\n        width: 10px;\n        border-top: 3px solid ${i.primaryForeground};\n        border-right: 3px solid ${i.primaryForeground};\n        transform: translateY(20%) rotate(-45deg);\n    }`];setTimeout((()=>{const e=document.querySelector("div.tl")??document.querySelector(".content.top");e.id=n;r.appendChild(s);document.body.appendChild(r);const t=[...document.styleSheets].slice(-1)[0];for(let e of a){t.insertRule(e,t.cssRules.length)}}),1500)})();
