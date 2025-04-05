// ==UserScript==
// @name           Fediverse text blur
// @name:ja        Misskey & Mastodon テキストぼかし
// @description    Blur text in Misskey v11 and Mastodon. Not available in Misskey v13.
// @description:ja Misskey v11とMastodonのテキストをぼかします。Misskey v13では利用できません。
// @match          https://misskey.dev/*
// @match          https://msky.work/*
// @match          https://misskey.noellabo.jp/*
// @match          https://fedibird.com/*
// @match          https://social.vivaldi.net/*
// @match          https://freakmix.com/*
// @author         hidao80
// @version        1.2.8
// @namespace      https://github.com/hidao80/UserScript/FediverseTextBlur
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4a7.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/FediverseTextBlur/FediverseTextBlur.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/FediverseTextBlur/FediverseTextBlur.min.user.js
// ==/UserScript==
(async()=>{const e=!1,t="Fediverse Text Blur",n={};["log","debug","warn","info","error"].forEach((t=>{n[t]=e?window.console[t]:function(){}}));const o=Math.abs(Array.from(t).reduce(((e,t)=>(e<<5)-e+t.charCodeAt(0)),0)).toString(16);n.debug(`[${t}]: Script Loading... [HASH = ${o}]`);const r=["article .havbbuyv,\n    article .status__content,\n    article .username,\n    .reply-to .havbbuyv,\n    .reply-to .content,\n    .reply-to .username,\n    article .display-name {\n        filter: blur(5px);\n    }","article header .info > span,\n    article footer span,\n    article header time > span {\n        filter: none;\n    }","article header > a,\n    article header > .xBLVI,\n    article header + div,\n    article .display-name,\n    article span,\n    .xBwhh > span,\n    .x22gY > span,\n    .x3YLY header > a,\n    .x3YLY header > a + div,\n    .x3YLY header + div,\n    ._panel.notification header > a,\n    ._panel.notification header + div {\n        filter: blur(5px);\n    }"];setTimeout((()=>{const e=[...document.styleSheets].slice(-1)[0];for(let t of r)e.insertRule(t,e.cssRules.length)}),500)})();
