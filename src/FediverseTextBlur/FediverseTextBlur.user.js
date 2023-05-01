// ==UserScript==
// @name        Fediverse text blur
// @nameja      Misskey & Mastodon テキストぼかし
// @description Blur text in Misskey v11 and Mastodon.
// @match       https://misskey.dev/*
// @match       https://msky.work/*
// @match       https://misskey.noellabo.jp/*
// @match       https://misskey.systems/*
// @match       https://fedibird.com/*
// @match       https://vivaldi.social.net/*
// @author      hidao80
// @version     1.0.1
// @namespace   https://github.com/hidao80/UserScript/FediverseTextBlur
// @license     MIT
// @icon        https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4a7.png
// @run-at      context-menu
// @grant       none
// @updateURL   https://github.com/hidao80/UserScript/raw/main/src/FediverseTextBlur/FediverseTextBlur.user.js
// @downloadURL https://github.com/hidao80/UserScript/raw/main/src/FediverseTextBlur/FediverseTextBlur.user.js
// ==/UserScript==

// Twitter Emoji (Twemoji)
// License
//   Copyright 2019 Twitter, Inc and other contributors
//   Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
//   https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS

'use strict';

/** Constant variable */
// When debugging: DEBUG = !false;
const DEBUG = !false;
const SCRIPT_CLASS = 'us-hidao80-FediverseTextBlur';
const SCRIPT_NAME = 'FediverseTextBlur';
DEBUG && console.debug(`[${SCRIPT_NAME}]: script started.`);

const styles = [
    `article .havbbuyv,
    article .status__content,
    article .display-name {
        filter: blur(5px);
    }`,
];



let indexes = JSON.parse(localStorage.getItem(SCRIPT_NAME + '_cssRules_indexes') || '[]');
DEBUG && console.debug(`[${SCRIPT_NAME}]: init indexes:`);
DEBUG && console.debug(indexes);

// Style is a later winner, so send and add
const usableSheet = [...document.styleSheets].slice(-1)[0];

if (indexes.length > 0) {
    for (const index of indexes) {
        usableSheet.deleteRule(index);
    }
    localStorage.setItem(SCRIPT_NAME + '_cssRules_indexes', '[]');
    DEBUG && console.debug(`[${SCRIPT_NAME}]: styles deleted.`);
} else {
    const index = usableSheet.cssRules.length;
    for (let style of styles) {
        indexes.push(index);
        usableSheet.insertRule(style, index);
    }
    localStorage.setItem(SCRIPT_NAME + '_cssRules_indexes', JSON.stringify(indexes));
    DEBUG && console.debug(`[${SCRIPT_NAME}]: styles added.`);
    DEBUG && console.debug(indexes);
}
