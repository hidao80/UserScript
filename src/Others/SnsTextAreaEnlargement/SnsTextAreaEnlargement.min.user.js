// ==UserScript==
// @name        Sns Text Area Enlargement
// @name:ja     SNSテキストエリア拡大
// @description Enlarge the text area.
// @match       https://fedibird.com/*
// @match       https://mstdn.jp/*
// @match       https://pawoo.net/*
// @match       https://mstdn.sublimer.me/*
// @match       https://social.vivaldi.net/*
// @match       https://misskey.dev/*
// @match       https://misskey.io/*
// @match       https://misskey.noellabo.jp/*
// @match       https://msky.work/*
// @match       https://tweetdeck.twitter.com/*
// @author      hidao80
// @version     1.3.1
// @namespace   https://github.com/hidao80/UserScript/SnsTextAreaEnlargement
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f5d2.png
// @run-at      document-end
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/Others/SnsTextAreaEnlargement/SnsTextAreaEnlargement.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/Others/SnsTextAreaEnlargement/SnsTextAreaEnlargement.min.user.js
// ==/UserScript==
(async()=>{const e=false;const t="us-hidao80-SnsTextAreaEnlargement";const s="SnsTextAreaEnlargement";e&&console.debug(`[${s}]: script started.`);const n=[`.compose-form .autosuggest-textarea__textarea {\n        resize: vertical;\n    }`,`.compose-text {\n        resize: vertical;\n    }`,`.form > textarea {\n        height: 30vh;\n    }`];const o=[`.textarea > textarea {\n        height: 30vh;\n    }`];const r=[];setTimeout((()=>{const t=[...document.styleSheets].slice(-1)[0];for(let e of n){t.insertRule(e,t.cssRules.length)}const s=window.navigator.userAgent.toLowerCase();e&&console.log(s);if(s.indexOf("iphone")!==-1||s.indexOf("ipad")!==-1){for(let e of o){t.insertRule(e,t.cssRules.length)}}if(s.indexOf("android")!==-1){for(let e of r){t.insertRule(e,t.cssRules.length)}}}),500)})();
