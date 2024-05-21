// ==UserScript==
// @name           Fediverse text blur
// @name:ja        Misskey & Mastodon テキストぼかし
// @description    Blur text in Misskey v11 and Mastodon. Not available in Misskey v13.
// @description:ja Misskey v11とMastodonのテキストをぼかします。Misskey v13では利用できません。
// @match          https://misskey.dev/*
// @match          https://msky.work/*
// @match          https://misskey.noellabo.jp/*
// @match          https://fedibird.com/*
// @match          https://vivaldi.social.net/*
// @author         hidao80
// @version        1.2.2
// @namespace      https://github.com/hidao80/UserScript/FediverseTextBlur
// @license        MIT
// @icon           https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4a7.png
// @run-at         document-end
// @grant          none
// @updateURL      https://github.com/hidao80/UserScript/raw/main/src/FediverseTextBlur/FediverseTextBlur.user.js
// @downloadURL    https://github.com/hidao80/UserScript/raw/main/src/FediverseTextBlur/FediverseTextBlur.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';

(async () => {
/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = false;
const SCRIPT_NAME = 'Fediverse Text Blur';
/** Suppress debug printing unless in debug mode */
const console = {};
["log","debug","warn","info","error"].forEach((o=>{console[o]=DEBUG?window.console[o]:function(){}}));
/** The script name is converted to a hexadecimal hash */
const HASH = Array.from(SCRIPT_NAME).reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0).toString(16);
console.debug(`[${SCRIPT_NAME}]: Script Loading... [HASH = ${HASH}]`);

/** Main */
const styles = [
    // for v11
    `article .havbbuyv,
    article .status__content,
    article .username,
    .reply-to .havbbuyv,
    .reply-to .content,
    .reply-to .username,
    article .display-name {
        filter: blur(5px);
    }`,
    // for v11. Eliminated side effects of v13 required settings
    `article header .info > span,
    article footer span,
    article header time > span {
        filter: none;
    }`,
    // for v13
    `article header > a,
    article header > .xBLVI,
    article header + div,
    article .display-name,
    article span,
    .xBwhh > span,
    .x22gY > span,
    .x3YLY header > a,
    .x3YLY header > a + div,
    .x3YLY header + div,
    ._panel.notification header > a,
    ._panel.notification header + div {
        filter: blur(5px);
    }`,
];

// Wait for content to complete loading.
setTimeout(() => {
    const usableSheet = [...document.styleSheets].slice(-1)[0];

    for (let style of styles) {
        usableSheet.insertRule(style, usableSheet.cssRules.length);
    }
}, 500);
})();
